Feature: Brands List API

  Background:
    * url baseUrl

  Scenario: API 3 - Get All Brands List
    Given path 'brandsList'
    When method get
    Then status 200
    And match response.responseCode == 200
    And match response.brands == '#[_ > 0]'

  Scenario: API 4 - PUT To All Brands List should not be allowed
    Given path 'brandsList'
    When method put
    Then status 200
    And match response.responseCode == 405
    And match response.message == messages.METHOD_NOT_SUPPORTED
