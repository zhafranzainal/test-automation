import { test, expect } from '@playwright/test';
import { apiRoutes } from '../../utils/routes';
import { invalidUser } from '../../data/apiUsers';

test.describe('Verify Login API', () => {

  test('API 8: POST To Verify Login without email parameter', async ({ request }) => {

    const response = await test.step('When user sends a login request without the email parameter', async () => {
      return request.post(apiRoutes.VERIFY_LOGIN, {
        form: { password: invalidUser.password },
      });
    });

    await test.step('Then response body should indicate a required parameter is missing', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(400);
      expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

  });

  test('API 9: DELETE To Verify Login should not be allowed', async ({ request }) => {

    const response = await test.step('When user sends a DELETE request to the verify login endpoint', async () => {
      return request.delete(apiRoutes.VERIFY_LOGIN);
    });

    await test.step('Then response body should indicate the request method is not supported', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(405);
      expect(body.message).toBe('This request method is not supported.');
    });

  });

  test('API 10: POST To Verify Login with invalid details', async ({ request }) => {

    const response = await test.step('When user logs in with an email/password that does not exist', async () => {
      return request.post(apiRoutes.VERIFY_LOGIN, { form: invalidUser });
    });

    await test.step('Then response body should indicate the user was not found', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(404);
      expect(body.message).toBe('User not found!');
    });

  });

});
