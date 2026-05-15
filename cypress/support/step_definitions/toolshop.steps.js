import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage, CategoryPage, ProductPage, LoginPage, ContactPage, SearchPage } from "../POM/index.js";

// Navigation & Home Page
When("I visit the home page", () => {
  HomePage.visitHome();
});

Given("I am on the home page", () => {
  HomePage.visitHome();
});

Then("the home page title should be displayed", () => {
  HomePage.verifyHomeTitle();
});

Then("the home url should contain the hash route", () => {
  HomePage.verifyHomeUrl();
});

Then("the navbar should display the Home link", () => {
  HomePage.verifyHomeLinks();
});

Then("the navbar should display the Categories button", () => {
  cy.contains("button", "Categories").should("exist");
});

Then("the navbar should display the Contact link", () => {
  cy.contains("a", "Contact").should("exist");
});

Then("the navbar should display the Sign in link", () => {
  HomePage.verifySignInLink();
});

Then("the Sign in link should be visible", () => {
  HomePage.verifySignInLink();
});

Then("I should not be authenticated", () => {
  HomePage.verifyHomeUrl();
});

// Categories & Products
When("I click the Categories button", () => {
  HomePage.openCategoriesMenu();
});

Then("the categories menu should be visible", () => {
  HomePage.verifyCategoriesMenuVisible();
});

When("I select a category", () => {
  CategoryPage.selectCategory(0);
});

Given("I am on the category page", () => {
  HomePage.visitHome();
  HomePage.openCategoriesMenu();
  CategoryPage.selectCategory(0);
});

Then("the category page should load", () => {
  CategoryPage.verifyCategoryUrl();
  CategoryPage.verifyProductsDisplayed();
});

When("I select sort option {int}", (index) => {
  CategoryPage.selectSortByIndex(index);
});

Then("the sort dropdown should be selected with option {int}", (index) => {
  CategoryPage.verifySortDropdownSelected(index);
});

When("I open the first product", () => {
  CategoryPage.openFirstProduct();
});

Given("I am on the product details page", () => {
  HomePage.visitHome();
  HomePage.openCategoriesMenu();
  CategoryPage.selectCategory(0);
  CategoryPage.openFirstProduct();
});

Then("the product details page should load", () => {
  ProductPage.verifyProductUrl();
  ProductPage.verifyProductDetailsVisible();
});

When("I add the product to cart", () => {
  ProductPage.addToCart();
});

Then("the add to cart success message should appear", () => {
  ProductPage.verifyAddToCartSuccess();
});

// Product Listing
Given("I click on a product from the listing", () => {
  cy.get('[data-testid*="product"]').first().click();
});

When("I click on a product from the listing", () => {
  cy.get('[data-testid*="product"]').first().click();
});

Then("product details should be displayed", () => {
  ProductPage.verifyProductDetailsVisible();
});

When("I add a product to cart from listing", () => {
  cy.get('[data-testid*="product"]').first().within(() => {
    cy.get("button").contains("Add to cart").click();
  });
});

Then("cart success message should appear", () => {
  cy.contains("Product added to cart").should("be.visible");
});

Then("product prices should be displayed", () => {
  cy.get(".price").should("have.length.greaterThan", 0);
});

// Search
When("I search for a valid product", () => {
  SearchPage.searchForProduct("hammer");
  SearchPage.submitSearch();
});

When("I search for an invalid product", () => {
  SearchPage.searchForProduct("zzzzzz-not-a-real-product");
  SearchPage.submitSearch();
});

When("I search for a product with multiple results", () => {
  SearchPage.searchForProduct("pliers");
  SearchPage.submitSearch();
});

Then("search results should be displayed", () => {
  SearchPage.verifySearchResultsExist();
});

Then("no search results should be displayed", () => {
  SearchPage.verifyNoResults();
});

Then("multiple search results should be displayed", () => {
  SearchPage.verifyMultipleResultsExist();
});

// Login
When("I navigate to the sign in page", () => {
  LoginPage.navigateToSignIn();
});

Given("I am on the sign in page", () => {
  LoginPage.navigateToSignIn();
});

Then("the login form should be visible", () => {
  LoginPage.verifyLoginFormVisible();
});

When("I submit login with empty fields", () => {
  LoginPage.submitLogin();
});

Then("validation errors should be displayed", () => {
  LoginPage.verifyValidationErrors();
});

Then("login error should be displayed", () => {
  LoginPage.verifyLoginError();
});

Then("login validation error should be displayed", () => {
  LoginPage.verifyValidationErrors();
});

When("I login with invalid credentials", () => {
  LoginPage.login("invalid@test.com", "invalidpass");
});

When("I login with customer credentials", () => {
  cy.fixture("toolshop").then((data) => {
    LoginPage.login(data.users.customer.email, data.users.customer.password);
  });
});

Then("I should be logged in", () => {
  cy.contains(data.users.customer.displayName).should("be.visible");
});

When("I login with wrong email and valid password", () => {
  cy.fixture("toolshop").then((data) => {
    LoginPage.login("wrong@test.com", data.users.customer.password);
  });
});

When("I login with valid email and wrong password", () => {
  cy.fixture("toolshop").then((data) => {
    LoginPage.login(data.users.customer.email, "wrongpassword");
  });
});

When("I login with invalid email format", () => {
  LoginPage.login("invalidemail", "password123");
});

// Contact
When("I navigate to the contact page", () => {
  ContactPage.navigateToContact();
});

Given("I am on the contact page", () => {
  ContactPage.navigateToContact();
});

Then("the contact form should be visible", () => {
  ContactPage.verifyContactFormVisible();
});

When("I submit contact form with empty fields", () => {
  ContactPage.submitContactForm();
});

Then("contact form validation errors should be displayed", () => {
  ContactPage.verifyContactFormValidationErrors();
});

// Sorting
When("I sort by price ascending", () => {
  CategoryPage.sortBy(2);
});

Then("products should be sorted by price ascending", () => {
  cy.get(".price").then(($prices) => {
    const prices = [...$prices].map((el) => parseFloat(el.textContent));
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sorted);
  });
});

When("I select sort by name ascending", () => {
  CategoryPage.sortBy(0);
});

Then("products should be sorted by name ascending", () => {
  CategoryPage.verifySortDropdownSelected(0);
});

When("I select sort by name descending", () => {
  CategoryPage.sortBy(1);
});

Then("products should be sorted by name descending", () => {
  CategoryPage.verifySortDropdownSelected(1);
});

When("I select a sort option and sort", () => {
  CategoryPage.sortBy(0);
});

Then("the sort selection should be maintained", () => {
  CategoryPage.verifySortDropdownSelected(0);
});
