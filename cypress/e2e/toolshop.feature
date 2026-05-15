Feature: Toolshop E2E Tests

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

  Scenario: TC04 - should navigate to a category from the menu
    Given I am on the home page
    When I click the Categories button
    And I select a category
    Then the category page should load

  Scenario: TC05 - should allow selecting an option from sort dropdown
    Given I am on the category page
    When I select sort option 0
    Then the sort dropdown should be selected with option 0

  Scenario: TC06 - should open a product details page
    Given I am on the category page
    When I open the first product
    Then the product details page should load

  Scenario: TC07 - should update cart state after adding a product
    Given I am on the product details page
    When I add the product to cart
    Then the add to cart success message should appear

  Scenario: TC08 - should show sign in link on public home
    Given I am on the home page
    Then the Sign in link should be visible

  Scenario: TC09 - should load sign in page with required fields
    When I navigate to the sign in page
    Then the login form should be visible

  Scenario: TC10 - should show login validation errors for empty fields
    Given I am on the sign in page
    When I submit login with empty fields
    Then validation errors should be displayed

  Scenario: TC11 - should fail login with invalid credentials
    Given I am on the sign in page
    When I login with invalid credentials
    Then login error should be displayed

  Scenario: TC12 - should submit login with fixture customer user
    Given I am on the sign in page
    When I login with customer credentials
    Then I should be logged in

  Scenario: TC13 - should remain in public state when not authenticated
    Given I am on the home page
    Then I should not be authenticated

  Scenario: TC14 - should load contact page with contact form
    When I navigate to the contact page
    Then the contact form should be visible

  Scenario: TC15 - should trigger contact form validation on empty submit
    Given I am on the contact page
    When I submit contact form with empty fields
    Then contact form validation errors should be displayed

  Scenario: TC16 - should reject login with wrong email and valid password
    Given I am on the sign in page
    When I login with wrong email and valid password
    Then login error should be displayed

  Scenario: TC17 - should reject login with valid email and wrong password
    Given I am on the sign in page
    When I login with valid email and wrong password
    Then login error should be displayed

  Scenario: TC18 - should reject login with invalid email format
    Given I am on the sign in page
    When I login with invalid email format
    Then login validation error should be displayed

  Scenario: TC19 - should search for valid product successfully
    Given I am on the home page
    When I search for a valid product
    Then search results should be displayed

  Scenario: TC20 - should display empty results for invalid search
    Given I am on the home page
    When I search for an invalid product
    Then no search results should be displayed

  Scenario: TC21 - should view product details from home listing
    Given I am on the home page
    When I click on a product from the listing
    Then product details should be displayed

  Scenario: TC22 - should add product to cart from home list
    Given I am on the home page
    When I add a product to cart from listing
    Then cart success message should appear

  Scenario: TC23 - should sort products by price ascending
    Given I am on the category page
    When I sort by price ascending
    Then products should be sorted by price ascending

  Scenario: TC24 - should display multiple search results
    Given I am on the home page
    When I search for a product with multiple results
    Then multiple search results should be displayed

  Scenario: TC25 - should display product price on listing
    Given I am on the home page
    Then product prices should be displayed

  Scenario: TC26 - should sort products by name ascending using dropdown
    Given I am on the category page
    When I select sort by name ascending
    Then products should be sorted by name ascending

  Scenario: TC27 - should sort products by name descending using dropdown
    Given I am on the category page
    When I select sort by name descending
    Then products should be sorted by name descending

  Scenario: TC28 - should maintain dropdown selection after sorting
    Given I am on the category page
    When I select a sort option and sort
    Then the sort selection should be maintained
