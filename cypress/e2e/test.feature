Feature: Toolshop e2e

  Scenario: TC01 - should load the home page
    When I visit the home page
    Then the home page title should be displayed
    And the home url should contain the hash route

  Scenario: TC02 - should display the main navbar links
    Given I am on the home page
    Then the navbar should display the Home link
    And the navbar should display the Categories button
    And the navbar should display the Contact link
    And the navbar should display the Sign in link

  Scenario: TC03 - should open the categories menu
    Given I am on the home page
    When I click the Categories button
    Then the categories menu should be visible