## Folder Structure
```

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

Run all tests:
```bash
npm test
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
npx playwright test --grep ""
```

Run tests filtered by tag:
```bash
npx playwright test --grep @
```

Launch Playwright codegen (open browser + inspector to record actions then save code):
```bash
npx playwright codegen --output=tests/new-test.spec.ts https://practicesoftwaretesting.com/
```

Open HTML report:
```bash
npx playwright show-report
```
