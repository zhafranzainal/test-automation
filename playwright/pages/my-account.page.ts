import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class MyAccountPage extends BasePage {

  readonly pageTitle: Locator;
  readonly navUserMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: 'My account' });
    this.navUserMenu = page.locator('[data-test="nav-menu"]');
  }

}
