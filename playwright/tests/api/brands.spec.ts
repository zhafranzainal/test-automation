import { test, expect } from '@playwright/test';
import { apiRoutes } from '../../utils/routes';

test.describe('Brands List API', () => {

  test('API 3: Get All Brands List', async ({ request }) => {

    const response = await test.step('When user sends a GET request to the brands list endpoint', async () => {
      return request.get(apiRoutes.BRANDS_LIST);
    });

    await test.step('Then response should return HTTP 200 with a non-empty list of brands', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(200);
      expect(Array.isArray(body.brands)).toBeTruthy();
      expect(body.brands.length).toBeGreaterThan(0);
    });

  });

  test('API 4: PUT To All Brands List should not be allowed', async ({ request }) => {

    const response = await test.step('When user sends a PUT request to the brands list endpoint', async () => {
      return request.put(apiRoutes.BRANDS_LIST);
    });

    await test.step('Then response body should indicate the request method is not supported', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(405);
      expect(body.message).toBe('This request method is not supported.');
    });

  });

});
