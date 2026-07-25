Feature: Verify Login API

  Background:
    * url baseUrl
    * def invalidUser = { email: 'not.a.real.user@example.com', password: 'wrong-password' }

  Scenario: API 8 - POST To Verify Login without email parameter
    Given path 'verifyLogin'
    And form field password = invalidUser.password
    When method post
    Then status 200
    And match response.responseCode == 400
    And match response.message == messages.LOGIN_MISSING_PARAM

  Scenario: API 9 - DELETE To Verify Login should not be allowed
    Given path 'verifyLogin'
    When method delete
    Then status 200
    And match response.responseCode == 405
    And match response.message == messages.METHOD_NOT_SUPPORTED

  Scenario: API 10 - POST To Verify Login with invalid details
    Given path 'verifyLogin'
    And form fields invalidUser
    When method post
    Then status 200
    And match response.responseCode == 404
    And match response.message == messages.USER_NOT_FOUND
