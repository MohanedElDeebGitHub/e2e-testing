import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  HomePage,
  CategoryPage,
  ProductPage,
  LoginPage,
  ContactPage,
  SearchPage,
} from "../POM/index.js";

// ─── Background ───────────────────────────────────────────────────────────────

Given("I visit the home page", () => {
  HomePage.visitHome();
});

// ─── Home Page ────────────────────────────────────────────────────────────────

Then("the home url should be valid", () => {
  HomePage.verifyHomeUrl();
});

Then("the home page title should be displayed", () => {
  cy.fixture("toolshop").then((data) => {
    HomePage.verifyHomeTitle(data.base.homeTitle);
  });
});

Then("the home page links should be visible", () => {
  HomePage.verifyHomeLinks();
});

Then("the navbar links should exist", () => {
  HomePage.verifyLinksExist();
});

Then("the Sign in link should be visible", () => {
  HomePage.verifySignInLink();
});

Then("the sign out link should not exist", () => {
  cy.contains("a,button", "Sign out").should("not.exist");
});

Then("the URL should not include {string}", (path) => {
  cy.url().should("not.include", path);
});

// ─── URL assertions ───────────────────────────────────────────────────────────

Then("the URL should include {string}", (path) => {
  cy.url().should("include", path);
});

// ─── Categories ───────────────────────────────────────────────────────────────

When("I click the Categories button", () => {
  CategoryPage.openCategoriesMenu();
});

Then("the categories menu should be visible", () => {
  CategoryPage.verifyCategoriesMenuVisible();
});

When("I select the {string} category", (categoryName) => {
  CategoryPage.selectCategory(categoryName);
});

Then("the category URL should include {string}", (slug) => {
  CategoryPage.verifyCategoryUrl(slug);
});

Then("products should be displayed", () => {
  CategoryPage.verifyProductsDisplayed();
});

Given("I am on the Hand Tools category page", () => {
  HomePage.visitHome();
  CategoryPage.selectCategory("Hand Tools");
});

// ─── Sorting ──────────────────────────────────────────────────────────────────

When("I select sort option {int}", (index) => {
  CategoryPage.sortBy(index);
});

Then("the sort dropdown should show a selected option", () => {
  CategoryPage.verifySortDropdownSelected();
});

When("I select sort option {int} on the category page sort dropdown", (index) => {
  CategoryPage.sortBy(index);
});

When("I select dropdown option {int}", (index) => {
  cy.get("select").first().select(index);
});

Then("the selected dropdown value should be maintained", () => {
  cy.get("select")
    .first()
    .find("option:selected")
    .invoke("attr", "value")
    .then((selectedValue) => {
      cy.get("select")
        .first()
        .find("option:selected")
        .invoke("attr", "value")
        .should("equal", selectedValue);
    });
});

When("the first sort dropdown is visible", () => {
  cy.get("select").first().should("be.visible");
});

// ─── Products ─────────────────────────────────────────────────────────────────

When("I open the first product", () => {
  CategoryPage.openFirstProduct();
});

When("I open the first product from the listing", () => {
  CategoryPage.openFirstProduct();
});

Then("the product URL should be valid", () => {
  ProductPage.verifyProductUrl();
});

Then("the product title should be visible", () => {
  ProductPage.verifyProductTitle();
});

Then("the add to cart button should be visible", () => {
  ProductPage.verifyAddToCartButton();
});

Then("the product details should be visible", () => {
  ProductPage.verifyProductDetailsVisible();
});

When("I add the product to cart", () => {
  ProductPage.addToCart();
});

Then("the add to cart success message should appear", () => {
  ProductPage.verifyAddToCartSuccess();
});

Then("a product link should have child elements", () => {
  cy.get('a[href*="/product/"]')
    .first()
    .within(() => {
      cy.get("h5, h4, span, p").should("have.length.greaterThan", 0);
    });
});

Then("the dollar sign should be visible", () => {
  cy.contains("$").should("be.visible");
});

// ─── Search ───────────────────────────────────────────────────────────────────

When("I search for the valid product term", () => {
  cy.fixture("toolshop").then((data) => {
    SearchPage.searchForProduct(data.search.validTerm);
  });
});

When("I search for the invalid product term", () => {
  cy.fixture("toolshop").then((data) => {
    SearchPage.searchForProduct(data.search.invalidTerm);
  });
});

When("I search for the valid product term 2", () => {
  cy.fixture("toolshop").then((data) => {
    SearchPage.searchForProduct(data.search.validTerm2);
  });
});

When("I submit the search", () => {
  SearchPage.submitSearch();
});

Then("search results should exist", () => {
  SearchPage.verifySearchResultsExist();
});

Then("no search results should be displayed", () => {
  SearchPage.verifyNoResults();
});

Then("multiple search results should be displayed", () => {
  SearchPage.verifyMultipleResultsExist();
});

// ─── Login ────────────────────────────────────────────────────────────────────

When("I navigate to the sign in page", () => {
  LoginPage.navigateToSignIn();
});

Then("the login page URL should be valid", () => {
  LoginPage.verifyLoginPageUrl();
});

Then("the page title should include the home title", () => {
  cy.fixture("toolshop").then((data) => {
    cy.title().should("include", data.base.homeTitle);
  });
});

Then("the login form should be visible", () => {
  LoginPage.verifyLoginFormVisible();
});

When("I submit the login form empty", () => {
  LoginPage.submitLogin();
});

Then("login validation errors should be displayed", () => {
  LoginPage.verifyValidationErrors();
});

Then("the login error message should be displayed", () => {
  LoginPage.verifyLoginError();
});

When("I login with email {string} and password {string}", (email, password) => {
  LoginPage.login(email, password);
});

When("I login with fixture customer credentials", () => {
  cy.fixture("toolshop").then((data) => {
    LoginPage.login(data.users.customer.email, data.users.customer.password);
  });
});

Then("the email field should contain {string}", (email) => {
  LoginPage.verifyEmailFieldValue(email);
});

Then("the email field should contain the customer email", () => {
  cy.fixture("toolshop").then((data) => {
    LoginPage.verifyEmailFieldValue(data.users.customer.email);
  });
});

Then("the password field should contain {string}", (password) => {
  LoginPage.verifyPasswordFieldValue(password);
});

Then("the submit button should be visible", () => {
  cy.get('button[type="submit"], input[type="submit"]').should("be.visible");
});

When("I login with email {string} and fixture customer password", (email) => {
  cy.fixture("toolshop").then((data) => {
    LoginPage.login(email, data.users.customer.password);
  });
});

When("I login with fixture customer email and password {string}", (password) => {
  cy.fixture("toolshop").then((data) => {
    LoginPage.login(data.users.customer.email, password);
  });
});

// ─── Contact ──────────────────────────────────────────────────────────────────

When("I navigate to the contact page", () => {
  ContactPage.navigateToContact();
});

Then("the contact page URL should be valid", () => {
  ContactPage.verifyContactPageUrl();
});

Then("the contact form should be visible", () => {
  ContactPage.verifyContactFormVisible();
});

When("I submit the contact form empty", () => {
  ContactPage.submitContactForm();
});

Then("the contact form validation errors should be displayed", () => {
  ContactPage.verifyContactFormValidationErrors();
});