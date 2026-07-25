Feature: Search Product API

  Background:
    * url baseUrl

  Scenario: API 5 - POST To Search Product
    Given path 'searchProduct'
    And form field search_product = 'top'
    When method post
    Then status 200
    And match response.responseCode == 200
    And match response.products == '#[]'

  Scenario: API 6 - POST To Search Product without search_product parameter
    Given path 'searchProduct'
    When method post
    Then status 200
    And match response.responseCode == 400
    And match response.message == messages.SEARCH_MISSING_PARAM
