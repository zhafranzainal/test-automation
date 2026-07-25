import { test, expect } from '@playwright/test';
import { generateNewUser } from '../../data/apiUsers';
import { apiRoutes } from '../../utils/routes';

// These tests share one dynamically generated user across the full lifecycle
// create -> login -> fetch -> update -> delete
test.describe.serial('User Account Lifecycle API', () => {

  const user = generateNewUser();

  test('API 11: POST To Create/Register User Account', async ({ request }) => {

    const response = await test.step('When user registers a new account', async () => {
      return request.post(apiRoutes.CREATE_ACCOUNT, { form: user });
    });

    await test.step('Then account should be created successfully', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(201);
      expect(body.message).toBe('User created!');
    });

  });

  test('API 7: POST To Verify Login with valid details', async ({ request }) => {

    const response = await test.step('When the newly created user logs in with correct credentials', async () => {
      return request.post(apiRoutes.VERIFY_LOGIN, {
        form: { email: user.email, password: user.password },
      });
    });

    await test.step('Then response body should confirm the user exists', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(200);
      expect(body.message).toBe('User exists!');
    });

  });

  test('API 14: GET user account detail by email', async ({ request }) => {

    const response = await test.step('When user fetches account details by email', async () => {
      return request.get(`${apiRoutes.GET_USER_DETAIL_BY_EMAIL}?email=${encodeURIComponent(user.email)}`);
    });

    await test.step('Then response should return the correct user details', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(200);
      expect(body.user.email).toBe(user.email);
      expect(body.user.first_name).toBe(user.firstname);
      expect(body.user.last_name).toBe(user.lastname);
    });

  });

  test('API 13: PUT METHOD To Update User Account', async ({ request }) => {

    const updatedUser = { ...user, name: `${user.name} Updated` };

    const response = await test.step('When user updates their account details', async () => {
      return request.put(apiRoutes.UPDATE_ACCOUNT, { form: updatedUser });
    });

    await test.step('Then account should be updated successfully', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(200);
      expect(body.message).toBe('User updated!');
    });

  });

  test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {

    const response = await test.step('When user deletes their account', async () => {
      return request.delete(apiRoutes.DELETE_ACCOUNT, {
        form: { email: user.email, password: user.password },
      });
    });

    await test.step('Then account should be deleted successfully', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(200);
      expect(body.message).toBe('Account deleted!');
    });

  });

});
