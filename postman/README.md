# Postman API Automation

API test suite for **Automation Exercise** built with **Postman** and executed headlessly using **Newman**.

The collection validates common REST API scenarios, including product retrieval, brand retrieval, product search, user account lifecycle, and login verification.

* **API**: https://automationexercise.com/

## Folder Structure

```text
postman/
├── automationexercise.postman_collection.json      # API request collection
├── automationexercise.postman_environment.json     # Environment variables
├── newman-report/                                  # Generated HTML reports (gitignored)
└── README.md
```

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
| API 10    | Create/Register User Account                                 |
| API 11    | Delete User Account                                          |

## Prerequisites

Install Node.js if it is not already installed.

Install Newman globally:

```bash
npm install -g newman
```

Install the HTML reporter:

```bash
npm install -g newman-reporter-htmlextra
```

## Running Tests

Run the entire collection:

```bash
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json
```

Run the collection and generate an HTML report:

```bash
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json \
-r cli,htmlextra \
--reporter-htmlextra-export postman/newman-report/report.html
```

Run only a specific folder within the collection:

```bash
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json \
--folder "User Account"
```

Run a single iteration:

```bash
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json \
-n 1
```

Run with verbose console output:

```bash
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json \
--verbose
```

Stop execution when a request or test fails:

```bash
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json \
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
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json \
-r cli,htmlextra \
--reporter-htmlextra-export postman/newman-report/report.html
```

After execution, open:

```text
postman/newman-report/report.html
```

The report includes:

* Request execution summary
* Pass/fail status
* Assertion results
* Response times
* Request and response payloads
* Overall execution statistics

## CI/CD

The collection can be executed in any CI/CD pipeline using Newman.

Example:

```bash
newman run postman/automationexercise.postman_collection.json \
-e postman/automationexercise.postman_environment.json \
-r cli,junit,htmlextra
```

The generated HTML and JUnit reports can be uploaded as pipeline artifacts in GitHub Actions, Azure DevOps, GitLab CI, or Jenkins.
