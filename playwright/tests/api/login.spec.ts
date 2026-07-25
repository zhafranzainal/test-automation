import { test, expect } from '@playwright/test';
import { apiRoutes } from '../../utils/routes';
import { invalidUser } from '../../data/apiUsers';
import { API_MESSAGES } from '../../utils/api-messages';
import { attachResponse } from '../../utils/api-helpers';

test.describe('Verify Login API', () => {

  test('API 8: POST To Verify Login without email parameter', async ({ request }, testInfo) => {

    const response = await test.step('When user sends a login request without the email parameter', async () => {
      return request.post(apiRoutes.VERIFY_LOGIN, {
        form: { password: invalidUser.password },
      });
    });

    const body = await response.json();
    await attachResponse(response, testInfo);

    await test.step('Then response body should indicate a required parameter is missing', async () => {
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(400);
      expect(body.message).toBe(API_MESSAGES.LOGIN_MISSING_PARAM);
    });

  });

  test('API 9: DELETE To Verify Login should not be allowed', async ({ request }, testInfo) => {

    const response = await test.step('When user sends a DELETE request to the verify login endpoint', async () => {
      return request.delete(apiRoutes.VERIFY_LOGIN);
    });

    const body = await response.json();
    await attachResponse(response, testInfo);

    await test.step('Then response body should indicate the request method is not supported', async () => {
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(405);
      expect(body.message).toBe(API_MESSAGES.METHOD_NOT_SUPPORTED);
    });

  });

  test('API 10: POST To Verify Login with invalid details', async ({ request }, testInfo) => {

    const response = await test.step('When user logs in with an email/password that does not exist', async () => {
      return request.post(apiRoutes.VERIFY_LOGIN, { form: invalidUser });
    });

    const body = await response.json();
    await attachResponse(response, testInfo);

    await test.step('Then response body should indicate the user was not found', async () => {
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(404);
      expect(body.message).toBe(API_MESSAGES.USER_NOT_FOUND);
    });

  });

});
