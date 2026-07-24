import { test, expect } from '../../fixtures/base.fixture';

import { LoginPage } from '../../pages/LoginPage';
import { MyAccountPage } from '../../pages/MyAccountPage';

test.describe('Customer Login', () => {

  test('customer should be able to sign in with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    await test.step('Given user navigates to Practice Software Testing', async () => {
      await loginPage.open();
    });

    await test.step('When user clicks on Sign in', async () => {
      await loginPage.clickSignIn();
    });

    await test.step('And user enters valid credentials and submits', async () => {
      await loginPage.waitForUrlContains('/auth/login');
      await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    });

    await test.step('Then user is able to view "My account" page with user name "Jane Doe"', async () => {
      await myAccountPage.waitForUrlContains('/account');
      await expect(myAccountPage.pageTitle).toBeVisible();
      await expect(myAccountPage.navUserMenu).toContainText('Jane Doe');
    });

  });

});
