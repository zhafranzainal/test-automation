# Playwright Test Automation

End-to-end (web) and API test suite for two practice sites, built with Playwright + TypeScript using the Page Object Model:

- **Web**: [practicesoftwaretesting.com](https://practicesoftwaretesting.com/) — login / customer account flows
- **API**: [automationexercise.com](https://automationexercise.com/) — products, brands, search, login, and account endpoints

## Folder Structure

```
playwright/
├── data/                     # Static/test data
│   ├── apiUsers.ts           # User payloads for API tests
│   └── users.ts              # Credentials/fixtures for web tests
├── fixtures/
│   └── base.fixture.ts       # Custom test fixture extending @playwright/test
├── pages/                    # Page Object Model
│   ├── base.page.ts          # Shared page behaviors (goto, waitForUrlContains, etc.)
│   ├── login.page.ts         # Login page locators & actions
│   └── my-account.page.ts    # My Account page locators & actions
├── tests/
│   ├── api/                  # API tests (automationexercise.com)
│   │   ├── account.spec.ts
│   │   ├── brands.spec.ts
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   └── search-product.spec.ts
│   └── web/                  # Web/UI tests (practicesoftwaretesting.com)
│       └── login.spec.ts
├── utils/
│   ├── routes.ts              # Centralized web & API route paths
│   └── ui-elements.ts          # Shared UI text/selectors (e.g. page headers)
├── .env.example               # Sample environment variables
├── playwright.config.ts       # Playwright config (web & api projects)
├── tsconfig.json
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

List all available tests (without running):
```bash
npx playwright test --list
```

Run all tests (web + api):
```bash
npm test
```

Run only web tests:
```bash
npm run test:web
```

Run only API tests:
```bash
npm run test:api
```

Run web tests in headed mode (visible browser):
```bash
npm run test:headed
```

Run failed tests only from last run:
```bash
npx playwright test --last-failed
```

Run specific test file with debug mode (step through test):
```bash
npx playwright test tests/web/login.spec.ts --project=web --debug
```

Run tests with Playwright UI mode (interactive test runner):
```bash
npx playwright test --ui
```

Run a specific test by title:
```bash
npx playwright test --grep "API 1"
````

Launch Playwright codegen (open browser + inspector to record actions then save code):
```bash
npx playwright codegen --output=tests/new-test.spec.ts https://practicesoftwaretesting.com/
```

Open HTML report:
```bash
npm run report
```
