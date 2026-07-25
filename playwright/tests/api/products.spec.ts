import { test, expect } from '@playwright/test';
import { apiRoutes } from '../../utils/routes';
import { API_MESSAGES } from '../../utils/api-messages';
import { attachResponse } from '../../utils/api-helpers';

test.describe('Products List API', () => {

  test('API 1: Get All Products List', async ({ request }, testInfo) => {

    const response = await test.step('When user sends a GET request to the products list endpoint', async () => {
      return request.get(apiRoutes.PRODUCTS_LIST);
    });

    const body = await response.json();
    await attachResponse(response, testInfo);

    await test.step('Then response should return HTTP 200 with a non-empty list of products', async () => {
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(200);
      expect(Array.isArray(body.products)).toBeTruthy();
      expect(body.products.length).toBeGreaterThan(0);
    });

  });

  test('API 2: POST To All Products List should not be allowed', async ({ request }, testInfo) => {

    const response = await test.step('When user sends a POST request to the products list endpoint', async () => {
      return request.post(apiRoutes.PRODUCTS_LIST);
    });

    const body = await response.json();
    await attachResponse(response, testInfo);

    await test.step('Then response body should indicate the request method is not supported', async () => {
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(405);
      expect(body.message).toBe(API_MESSAGES.METHOD_NOT_SUPPORTED);
    });

  });

});
