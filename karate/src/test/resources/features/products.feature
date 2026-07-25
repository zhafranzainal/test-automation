Feature: Products List API

  Background:
    * url baseUrl

  Scenario: API 1 - Get All Products List
    Given path 'productsList'
    When method get
    Then status 200
    And match response.responseCode == 200
    And match response.products == '#[_ > 0]'

  Scenario: API 2 - POST To All Products List should not be allowed
    Given path 'productsList'
    When method post
    Then status 200
    And match response.responseCode == 405
    And match response.message == messages.METHOD_NOT_SUPPORTED
