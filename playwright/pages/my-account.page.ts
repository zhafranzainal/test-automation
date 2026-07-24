import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { routes } from '../utils/routes';

export class MyAccountPage extends BasePage {

  readonly pageTitle: Locator;
  readonly navUserMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: 'My account' });
    this.navUserMenu = page.locator('[data-test="nav-menu"]');
  }

  async waitForLoad() {
    await this.waitForUrlContains(routes.myAccountPageUrl);
  }

}
