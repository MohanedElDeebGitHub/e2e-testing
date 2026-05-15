Feature: Toolshop E2E Tests

  Background:
    Given I visit the home page

  Scenario: TC01 - should load the home page
    Then the home url should be valid
    And the home page title should be displayed
    And the home page links should be visible

  Scenario: TC02 - should display the main navbar links
    Then the navbar links should exist
    And the home page links should be visible

  Scenario: TC03 - should open the categories menu
    When I click the Categories button
    Then the URL should include "practicesoftwaretesting.com"
    And the categories menu should be visible

  Scenario: TC04 - should navigate to a category from the menu
    When I select the "Hand Tools" category
    Then the category URL should include "hand-tools"
    And products should be displayed

  Scenario: TC05 - should allow selecting an option from sort dropdown
    When I select the "Hand Tools" category
    And I select sort option 1
    Then the sort dropdown should show a selected option
    And the URL should include "/category/"

  Scenario: TC06 - should open a product details page
    When I select the "Hand Tools" category
    And I open the first product
    Then the product URL should be valid
    And the product title should be visible
    And the add to cart button should be visible

  Scenario: TC07 - should update cart state after adding a product
    When I select the "Hand Tools" category
    And I open the first product
    And I add the product to cart
    Then the add to cart success message should appear
    And the product URL should be valid
    And the product details should be visible

  Scenario: TC08 - should show sign in link on public home
    Then the Sign in link should be visible
    And the home page links should be visible
    And the home url should be valid

  Scenario: TC09 - should load sign in page with required fields
    When I navigate to the sign in page
    Then the login page URL should be valid
    And the page title should include the home title
    And the login form should be visible

  Scenario: TC10 - should show login validation errors for empty fields
    When I navigate to the sign in page
    And I submit the login form empty
    Then the login page URL should be valid
    And the login form should be visible
    And login validation errors should be displayed

  Scenario: TC11 - should fail login with invalid credentials
    When I navigate to the sign in page
    And I login with email "wrong@example.com" and password "wrongpass"
    Then the login page URL should be valid
    And the email field should contain "wrong@example.com"
    And the password field should contain "wrongpass"
    And the login error message should be displayed

  Scenario: TC12 - should submit login with fixture customer user
    When I navigate to the sign in page
    And I login with fixture customer credentials
    Then the login page URL should be valid
    And the email field should contain the customer email
    And the submit button should be visible

  Scenario: TC13 - should remain in public state when not authenticated
    Then the Sign in link should be visible
    And the sign out link should not exist
    And the URL should not include "/account"

  Scenario: TC14 - should load contact page with contact form
    When I navigate to the contact page
    Then the contact page URL should be valid
    And the page title should include the home title
    And the contact form should be visible

  Scenario: TC15 - should trigger contact form validation on empty submit
    When I navigate to the contact page
    And I submit the contact form empty
    Then the contact page URL should be valid
    And the contact form validation errors should be displayed

  Scenario: TC16 - should reject login with wrong email and valid password
    When I navigate to the sign in page
    And I login with email "not-a-user@example.com" and fixture customer password
    Then the login page URL should be valid
    And the email field should contain "not-a-user@example.com"
    And the login error message should be displayed

  Scenario: TC17 - should reject login with valid email and wrong password
    When I navigate to the sign in page
    And I login with fixture customer email and password "wrong-password-123"
    Then the login page URL should be valid
    And the email field should contain the customer email
    And the login error message should be displayed

  Scenario: TC18 - should reject login with invalid email format
    When I navigate to the sign in page
    And I login with email "bad-email-format" and password "some-password"
    Then the login page URL should be valid
    And the email field should contain "bad-email-format"
    And login validation errors should be displayed

  Scenario: TC19 - should search for valid product successfully
    When I search for the valid product term
    And I submit the search
    Then the URL should include "/"
    And search results should exist

  Scenario: TC20 - should display empty results for invalid search
    When I search for the invalid product term
    And I submit the search
    Then no search results should be displayed

  Scenario: TC21 - should view product details from home listing
    When I open the first product from the listing
    Then the product URL should be valid
    And the product title should be visible
    And the add to cart button should be visible

  Scenario: TC22 - should add product to cart from home list
    When I open the first product from the listing
    And I add the product to cart
    Then the add to cart success message should appear
    And the product URL should be valid

  Scenario: TC23 - should sort products by price ascending
    When the first sort dropdown is visible
    And I select sort option 2 on the category page sort dropdown
    Then products should be displayed

  Scenario: TC24 - should display multiple search results
    When I search for the valid product term 2
    And I submit the search
    Then multiple search results should be displayed

  Scenario: TC25 - should display product price on listing
    Then a product link should have child elements
    And the dollar sign should be visible

  Scenario: TC26 - should sort products by name ascending using dropdown
    When I select the "Hand Tools" category
    And I select dropdown option 0
    Then the sort dropdown should show a selected option
    And products should be displayed

  Scenario: TC27 - should sort products by name descending using dropdown
    When I select the "Hand Tools" category
    And I select dropdown option 1
    Then the sort dropdown should show a selected option
    And products should be displayed

  Scenario: TC28 - should maintain dropdown selection after sorting
    When I select the "Hand Tools" category
    And I select dropdown option 0
    Then the selected dropdown value should be maintained
    And products should be displayed
