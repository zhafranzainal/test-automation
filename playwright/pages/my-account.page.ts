import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { routes } from '../utils/routes';
import { PAGE_HEADER } from '../utils/ui-elements';

export class MyAccountPage extends BasePage {

  readonly pageTitle: Locator;
  readonly navUserMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: PAGE_HEADER.MY_ACCOUNT_PAGE });
    this.navUserMenu = page.getByTestId('nav-menu');
  }

  async waitForLoad() {
    await this.waitForUrlContains(routes.MY_ACCOUNT_PAGE_URL);
  }

}
