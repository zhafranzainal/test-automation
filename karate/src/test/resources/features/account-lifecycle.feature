Feature: User Account Lifecycle API

  # create -> login -> fetch -> update -> delete, sharing one generated user.
  # Kept as a single Scenario because Karate scenarios do not share state
  # with each other, only within one scenario's step chain.

  Background:
    * url baseUrl
    * def timestamp = function(){ return java.lang.System.currentTimeMillis() + '' }
    * def ts = timestamp()
    * def user = ({ name: 'QA Tester ' + ts, email: 'qa.tester.' + ts + '@example.com', password: 'Test@1234', title: 'Mr', birth_date: '15', birth_month: '6', birth_year: '1995', firstname: 'QA', lastname: 'Tester', company: 'Fintech Sdn Bhd', address1: '123 Automation Street', address2: 'Unit 4B', country: 'Turkey', zipcode: '35210', state: 'Izmir', city: 'Izmir', mobile_number: '5456789012' })

  Scenario: API 11 -> 7 -> 14 -> 13 -> 12 - full account lifecycle for one user

    # API 11: POST To Create/Register User Account
    Given path 'createAccount'
    And form fields user
    When method post
    Then status 200
    And match response.responseCode == 201
    And match response.message == messages.USER_CREATED

    # API 7: POST To Verify Login with valid details
    Given path 'verifyLogin'
    And form field email = user.email
    And form field password = user.password
    When method post
    Then status 200
    And match response.responseCode == 200
    And match response.message == messages.USER_EXISTS

    # API 14: GET user account detail by email
    Given path 'getUserDetailByEmail'
    And param email = user.email
    When method get
    Then status 200
    And match response.responseCode == 200
    And match response.user.email == user.email
    And match response.user.first_name == user.firstname
    And match response.user.last_name == user.lastname

    # API 13: PUT METHOD To Update User Account
    * def updatedUser = JSON.parse(JSON.stringify(user))
    * set updatedUser.name = user.name + ' Updated'
    Given path 'updateAccount'
    And form fields updatedUser
    When method put
    Then status 200
    And match response.responseCode == 200
    And match response.message == messages.USER_UPDATED

    # API 12: DELETE METHOD To Delete User Account
    Given path 'deleteAccount'
    And form field email = user.email
    And form field password = user.password
    When method delete
    Then status 200
    And match response.responseCode == 200
    And match response.message == messages.ACCOUNT_DELETED
