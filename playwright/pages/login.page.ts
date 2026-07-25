import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { webRoutes } from '../utils/routes';

export class LoginPage extends BasePage {

  readonly signInLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByTestId('nav-sign-in');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
    this.errorMessage = page.getByTestId('login-error');
  }

  async open() {
    await this.goto('/');
  }

  async waitForLoad() {
    await this.waitForUrlContains(webRoutes.LOGIN_PAGE_URL);
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
