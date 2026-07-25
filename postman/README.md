# Postman API Automation

API test suite for **Automation Exercise** built with **Postman** and executed headlessly using **Newman**.

The collection validates common REST API scenarios, including product retrieval, brand retrieval, product search, user account lifecycle, and login verification.

* **API**: https://automationexercise.com/

## Folder Structure

```text
postman/
├── newman-report/                                  # Generated HTML/JUnit reports (gitignored)
├── automationexercise.postman_collection.json      # API request collection (Newman/CI source of truth)
├── automationexercise.postman_environment.json     # Environment variables
├── package-lock.json
├── package.json                                    # Newman + reporter dependencies and npm scripts
└── README.md
```

> **Note on two collection formats:** This repo currently has both a v2.1 JSON collection (used by Newman/CI) and a v3 YAML collection under `collections/` (used by the Postman App's Native Git integration). **Newman cannot run the YAML format** — only the Postman CLI can. Keep `automationexercise.postman_collection.json` as the source of truth for test runs, and treat the YAML tree as inert unless migrate the pipeline to the Postman CLI.

## Test Coverage

The collection covers the following scenarios:

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

APIs 11, 7, 14, 13, and 12 run in sequence inside the **User Account Lifecycle** folder (create → login → fetch → update → delete), sharing a dynamically generated test user across the run.

## Prerequisites

```bash
npm install
```

## Running Tests

Run the entire collection:

```bash
npm run test:api
```

Run the collection and generate an HTML report:

```bash
npm run test:report
```

Run the collection with HTML + JUnit reports (used in CI):

```bash
npm run test:ci
```

For anything not covered by an npm script, use `npx newman` directly, e.g.:

Run only a specific folder within the collection:

```bash
npx newman run automationexercise.postman_collection.json \
-e automationexercise.postman_environment.json \
--folder "User Account Lifecycle"
```

Run a single iteration:

```bash
npx newman run automationexercise.postman_collection.json \
-e automationexercise.postman_environment.json \
-n 1
```

Run with verbose console output:

```bash
npx newman run automationexercise.postman_collection.json \
-e automationexercise.postman_environment.json \
--verbose
```

Stop execution when a request or test fails:

```bash
npx newman run automationexercise.postman_collection.json \
-e automationexercise.postman_environment.json \
--bail
```

## Running from Postman

1. Open the **Automation Exercise API** collection.
2. Select the **Automation Exercise** environment.
3. Click **Run**.
4. Execute the collection.
5. Review the execution summary and assertion results.

## Reports

Generate an HTML execution report:

```bash
npm run test:report
```

After execution, open:

```text
newman-report/report.html
```

The report includes:

* Request execution summary
* Pass/fail status
* Assertion results
* Response times
* Request and response payloads
* Overall execution statistics

## CI/CD

The collection can be executed in any CI/CD pipeline using Newman. Since `newman` is a devDependency in `package.json`, the pipeline only needs Node.js and `npm install` — no global Newman install.

Example:

```bash
cd postman
npm install
npm run test:ci
```

The generated HTML and JUnit reports (`newman-report/report.html`, `newman-report/results.xml`) can be uploaded as pipeline artifacts in GitHub Actions, Azure DevOps, GitLab CI, or Jenkins.
