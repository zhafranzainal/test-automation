import { test, expect } from '../../fixtures/base.fixture';

import { LoginPage } from '../../pages/login.page';
import { MyAccountPage } from '../../pages/my-account.page';
import { testUsers } from '../../data/users';
import { PAGE_HEADER } from '../../utils/ui-elements';

test.describe('Customer Login', () => {

  test('customer should be able to sign in with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);
    const { email, password, fullName } = testUsers.validCustomer1;

    await test.step('Given user navigates to Practice Software Testing', async () => {
      await loginPage.open();
    });

    await test.step('When user clicks on Sign in', async () => {
      await loginPage.clickSignIn();
    });

    await test.step('And user enters valid credentials and submits', async () => {
      await loginPage.waitForLoad();
      await loginPage.login(email, password);
    });

    await test.step(`Then user is able to view "${PAGE_HEADER.MY_ACCOUNT_PAGE}" page with user name "${fullName}"`, async () => {
      await myAccountPage.waitForLoad();
      await expect(myAccountPage.pageTitle).toBeVisible();
      await expect(myAccountPage.navUserMenu).toContainText(fullName);
    });

  });

});
