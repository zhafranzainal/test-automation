# test-automation
Centralized QA automation repository containing UI and API testing frameworks using **Playwright**, **Postman (Newman)**, and **Karate**, with GitHub Actions CI/CD and a combined execution report published to GitHub Pages.

Two target applications are exercised across these suites:

- **UI**: [practicesoftwaretesting.com](https://practicesoftwaretesting.com/) — login / customer account flows (Playwright)
- **API**: [automationexercise.com](https://automationexercise.com/api_list) — products, brands, search, login, and account lifecycle endpoints, covered independently in **all three** frameworks so they can be compared side by side

## Repository Structure

```text
test-automation/
├── playwright/     # UI (web) + API tests — TypeScript, Page Object Model
├── postman/        # API tests — Postman collection run headlessly via Newman
├── karate/         # API tests — Gherkin-style feature files, Java/Maven
└── .github/
    └── workflows/
        └── test-automation.yml   # CI pipeline for all three suites
```

Each framework is self-contained with its own README, dependencies, and run instructions:

| Framework                  | Type     | Target                                                         | Language/Runner                      | Docs                                           |
| -------------------------- | -------- | -------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| [Playwright](./playwright) | UI + API | practicesoftwaretesting.com (UI), automationexercise.com (API) | TypeScript / Node                    | [playwright/README.md](./playwright/README.md) |
| [Postman](./postman)       | API      | automationexercise.com                                         | Postman collection / Newman (Node)   | [postman/README.md](./postman/README.md)       |
| [Karate](./karate)         | API      | automationexercise.com                                         | Gherkin feature files / Java + Maven | [karate/README.md](./karate/README.md)         |

## API Coverage

The `playwright/tests/api/`, `postman/`, and `karate/` suites implement the same 14 test cases against automationexercise.com, so results can be diffed among these tools:

| Test Case | Description                                                  |
| --------- | ------------------------------------------------------------ |
| API 1     | Get All Products List                                        |
| API 2     | POST To All Products List (negative)                         |
| API 3     | Get All Brands List                                          |
| API 4     | PUT To All Brands List (negative)                            |
| API 5     | Search Product                                               |
| API 6     | Search Product Without `search_product` Parameter (negative) |
| API 7     | Verify Login with Valid Details                              |
| API 8     | Verify Login without Email Parameter (negative)              |
| API 9     | Delete To Verify Login (negative)                            |
| API 10    | Verify Login with Invalid Details (negative)                 |
| API 11    | Create/Register User Account                                 |
| API 12    | Delete User Account                                          |
| API 13    | Update User Account                                          |
| API 14    | Get User Account Detail by Email                             |

APIs 11, 7, 14, 13, and 12 run in sequence (create → login → fetch → update → delete) against a single dynamically generated test user.

## CI/CD

GitHub Actions (`.github/workflows/test-automation.yml`) runs on every push to `main` with four jobs:

1. **`playwright`** — spins up the `practice-software-testing` app (Angular UI + Laravel API + MariaDB) via Docker Compose, seeds the database, waits for the UI to become healthy, only then runs the full Playwright suite (`npm test`); running the application locally avoids UI testing failures caused by anti-bot protections (i.e., Cloudflare).
2. **`newman`** — installs dependencies and runs the Postman collection via `npm run test:ci` (HTML + JUnit reports).
3. **`karate`** — runs `mvn -B test` against automationexercise.com.
4. **`publish-report`** — downloads the artifacts from all three jobs, assembles a combined static site (Playwright HTML report, Newman HTML report, Karate summary report) with a simple index page, and deploys it to **GitHub Pages**.

Each job uploads its own report as a workflow artifact (30-day retention) independent of whether the Pages deployment runs.

## Getting Started

Pick a suite and follow its README for setup and run commands:

```bash
# Playwright (UI + API)
cd playwright && npm install && npx playwright install && npm test

# Postman/Newman (API)
cd postman && npm install && npm test

# Karate (API)
cd karate && mvn test
```
