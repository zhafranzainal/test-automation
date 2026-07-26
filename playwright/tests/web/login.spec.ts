import { test, expect } from '../../fixtures/base.fixture';

import { LoginPage } from '../../pages/login.page';
import { MyAccountPage } from '../../pages/my-account.page';
import { runtimeUser } from '../../data/runtimeUser';
import { PAGE_HEADER } from '../../utils/ui-elements';

test.describe('Customer Login', () => {

  const { email, password, fullName } = runtimeUser;

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

      await loginPage.waitForLoad();
      await loginPage.login(email, password);

      const loginFailed = await expect(loginPage.errorMessage)
        .toBeVisible({ timeout: 3000 })
        .then(() => true)
        .catch(() => false);

      if (loginFailed) {

        const errorText = await loginPage.errorMessage.textContent();

        if (/locked|too many|attempts/i.test(errorText ?? '')) {
          test.skip(true, `Shared demo account locked by external activity: "${errorText}" — not a defect in this suite`);
        }

        throw new Error(`Login failed unexpectedly: "${errorText}"`);

      }

    });

    await test.step(`Then user is able to view "${PAGE_HEADER.MY_ACCOUNT_PAGE}" page${fullName ? ` with user name "${fullName}"` : ''}`, async () => {
      await myAccountPage.waitForLoad();
      await expect(myAccountPage.pageTitle).toBeVisible();
      if (fullName) {
        await expect(myAccountPage.navUserMenu).toContainText(fullName);
      }
    });

  });

  test('customer should not be able to sign in with invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.clickSignIn();
    await loginPage.waitForLoad();
    await loginPage.login(email, 'wrong-password');

    await expect(loginPage.errorMessage).toBeVisible();

  });

});
