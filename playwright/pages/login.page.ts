import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { routes } from '../utils/routes';

export class LoginPage extends BasePage {

  readonly signInLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.locator('[data-test="nav-sign-in"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
  }

  async open() {
    await this.goto('/');
  }

  async waitForLoad() {
    await this.waitForUrlContains(routes.LOGIN_PAGE_URL);
  }

  async clickSignIn() {
    await this.signInLink.click();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

}
