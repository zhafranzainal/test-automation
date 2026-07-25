# Karate API Automation

API test suite for **Automation Exercise** built with **Karate** (Gherkin-style, no step-def glue code needed).

Same coverage as the `postman/` and `playwright/tests/api/` suites, so all three can be compared side by side.

* **API**: https://automationexercise.com/api

## Folder Structure

```text
karate/
├── src/test/java/runners/TestRunner.java          # JUnit 5 runner, discovers all *.feature files
├── src/test/resources/karate-config.js            # baseUrl + shared response-message constants
├── src/test/resources/features/
│   ├── products.feature                           # API 1, 2
│   ├── brands.feature                             # API 3, 4
│   ├── search-product.feature                     # API 5, 6
│   ├── login.feature                              # API 8, 9, 10
│   └── account-lifecycle.feature                  # API 11 -> 7 -> 14 -> 13 -> 12
├── pom.xml
└── README.md
```

## Test Coverage

| Test Case | Description                                                  | Feature file              |
|-----------|--------------------------------------------------------------|---------------------------|
| API 1     | Get All Products List                                        | products.feature          |
| API 2     | POST To All Products List (negative)                         | products.feature          |
| API 3     | Get All Brands List                                          | brands.feature            |
| API 4     | PUT To All Brands List (negative)                            | brands.feature            |
| API 5     | Search Product                                               | search-product.feature    |
| API 6     | Search Product Without `search_product` Parameter (negative) | search-product.feature    |
| API 7     | Verify Login with Valid Details                              | account-lifecycle.feature |
| API 8     | Verify Login without Email Parameter (negative)              | login.feature             |
| API 9     | Delete To Verify Login (negative)                            | login.feature             |
| API 10    | Verify Login with Invalid Details (negative)                 | login.feature             |
| API 11    | Create/Register User Account                                 | account-lifecycle.feature |
| API 12    | Delete User Account                                          | account-lifecycle.feature |
| API 13    | Update User Account                                          | account-lifecycle.feature |
| API 14    | Get User Account Detail by Email                             | account-lifecycle.feature |

APIs 11, 7, 14, 13, 12 run **in order inside a single Scenario** in `account-lifecycle.feature`
(create -> login -> fetch -> update -> delete). Karate scenarios don't share state with each other, so the whole chain
has to live in one scenario's step list rather than being split into five.

## Prerequisites

* JDK 17+
* Maven 3.8+

## Running Tests

Run the entire suite:

```bash
mvn test
```

Run against a different env (see `karate-config.js`):

```bash
mvn test -Dkarate.env=prod
```

Run a single feature:

```bash
mvn test -Dkarate.options="classpath:features/products.feature"
```

Run a single scenario by line number:

```bash
mvn test -Dkarate.options="classpath:features/products.feature:6"
```

## Reports

Karate generates its own reports after every run, no extra plugin needed:

```text
target/karate-reports/karate-summary.html
```

JUnit XML (for CI dashboards) lands in the usual Surefire location:

```text
target/surefire-reports/
```

## CI/CD

```bash
cd karate
mvn -B test
```

Upload `target/karate-reports/` and `target/surefire-reports/` as pipeline artifacts.
