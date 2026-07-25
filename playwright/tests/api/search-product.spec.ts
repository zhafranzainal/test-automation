import { test, expect } from '@playwright/test';
import { apiRoutes } from '../../utils/routes';

test.describe('Search Product API', () => {

  test('API 5: POST To Search Product', async ({ request }) => {

    const response = await test.step('When user searches for a product using the search_product parameter', async () => {
      return request.post(apiRoutes.SEARCH_PRODUCT, {
        form: { search_product: 'top' },
      });
    });

    await test.step('Then response should return HTTP 200 with matching products', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(200);
      expect(Array.isArray(body.products)).toBeTruthy();
    });

  });

  test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {

    const response = await test.step('When user sends a search request without the search_product parameter', async () => {
      return request.post(apiRoutes.SEARCH_PRODUCT, { form: {} });
    });

    await test.step('Then response body should indicate the parameter is missing', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.responseCode).toBe(400);
      expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
    });

  });

});
