describe("Toolshop: e2e", () => {
  let data;

  // Import all POM classes
  const { HomePage, CategoryPage, ProductPage, LoginPage, ContactPage, SearchPage } = require("../../support/POM/index");

  before(() => {
    cy.fixture("toolshop").then((d) => {
      data = d;
    });
  });

  beforeEach(function () {
    HomePage.visitHome();
  });

  it("TC01 - should load the home page", () => {
    HomePage.visitHome();
    HomePage.verifyHomeUrl();
    HomePage.verifyHomeTitle(data.base.homeTitle);
    HomePage.verifyHomeLinks();
  });

  it("TC02 - should display the main navbar links", () => {
    HomePage.visitHome();
    HomePage.verifyLinksExist();
    HomePage.verifyHomeLinks();
  });

  it("TC03 - should open the categories menu", () => {
    CategoryPage.openCategoriesMenu();
    cy.url().should("include", "practicesoftwaretesting.com");
    CategoryPage.verifyCategoriesMenuVisible();
  });

  it("TC04 - should navigate to a category from the menu", () => {
    CategoryPage.selectCategory("Hand Tools");
    CategoryPage.verifyCategoryUrl("hand-tools");
    CategoryPage.verifyProductsDisplayed();
  });

  it("TC05 - should allow selecting an option from sort dropdown", () => {
    CategoryPage.selectCategory("Hand Tools");
    CategoryPage.sortBy(1);
    CategoryPage.verifySortDropdownSelected();
    cy.url().should("include", "/category/");
  });

  it("TC06 - should open a product details page", () => {
    CategoryPage.selectCategory("Hand Tools");
    CategoryPage.openFirstProduct();
    ProductPage.verifyProductUrl();
    ProductPage.verifyProductTitle();
    ProductPage.verifyAddToCartButton();
  });

  it("TC07 - should update cart state after adding a product", () => {
    CategoryPage.selectCategory("Hand Tools");
    CategoryPage.openFirstProduct();
    ProductPage.addToCart();
    ProductPage.verifyAddToCartSuccess();
    ProductPage.verifyProductUrl();
    ProductPage.verifyProductDetailsVisible();
  });

  it("TC08 - should show sign in link on public home", () => {
    HomePage.visitHome();
    HomePage.verifySignInLink();
    HomePage.verifyHomeLinks();
    HomePage.verifyHomeUrl();
  });

  it("TC09 - should load sign in page with required fields", () => {
    LoginPage.navigateToSignIn();
    LoginPage.verifyLoginPageUrl();
    cy.title().should("include", data.base.homeTitle);
    LoginPage.verifyLoginFormVisible();
  });

  it("TC10 - should show login validation errors for empty fields", () => {
    LoginPage.navigateToSignIn();
    LoginPage.submitLogin();
    LoginPage.verifyLoginPageUrl();
    LoginPage.verifyLoginFormVisible();
    LoginPage.verifyValidationErrors();
  });

  it("TC11 - should fail login with invalid credentials", () => {
    LoginPage.navigateToSignIn();
    LoginPage.login("wrong@example.com", "wrongpass");
    LoginPage.verifyLoginPageUrl();
    LoginPage.verifyEmailFieldValue("wrong@example.com");
    LoginPage.verifyPasswordFieldValue("wrongpass");
    LoginPage.verifyLoginError();
  });

  it("TC12 - should submit login with fixture customer user", () => {
    LoginPage.navigateToSignIn();
    LoginPage.login(data.users.customer.email, data.users.customer.password);
    LoginPage.verifyLoginPageUrl();
    LoginPage.verifyEmailFieldValue(data.users.customer.email);
    cy.get('button[type="submit"], input[type="submit"]').should("be.visible");
  });

  it("TC13 - should remain in public state when not authenticated", () => {
    HomePage.visitHome();
    HomePage.verifySignInLink();
    cy.contains("a,button", "Sign out").should("not.exist");
    cy.url().should("not.include", "/account");
  });

  it("TC14 - should load contact page with contact form", () => {
    ContactPage.navigateToContact();
    ContactPage.verifyContactPageUrl();
    cy.title().should("include", data.base.homeTitle);
    ContactPage.verifyContactFormVisible();
  });

  it("TC15 - should trigger contact form validation on empty submit", () => {
    ContactPage.navigateToContact();
    ContactPage.submitContactForm();
    ContactPage.verifyContactPageUrl();
    ContactPage.verifyContactFormValidationErrors();
  });

  it("TC16 - should reject login with wrong email and valid password", () => {
    LoginPage.navigateToSignIn();
    LoginPage.login("not-a-user@example.com", data.users.customer.password);
    LoginPage.verifyLoginPageUrl();
    LoginPage.verifyEmailFieldValue("not-a-user@example.com");
    LoginPage.verifyLoginError();
  });

  it("TC17 - should reject login with valid email and wrong password", () => {
    LoginPage.navigateToSignIn();
    LoginPage.login(data.users.customer.email, "wrong-password-123");
    LoginPage.verifyLoginPageUrl();
    LoginPage.verifyEmailFieldValue(data.users.customer.email);
    LoginPage.verifyLoginError();
  });

  it("TC18 - should reject login with invalid email format", () => {
    LoginPage.navigateToSignIn();
    LoginPage.login("bad-email-format", "some-password");
    LoginPage.verifyLoginPageUrl();
    LoginPage.verifyEmailFieldValue("bad-email-format");
    LoginPage.verifyValidationErrors();
  });

  // ============================================
  // NEW SIMPLE TEST CASES (7 TESTS)
  // ============================================

  // TEST 1: Search for a valid product by term
  it("TC19 - should search for valid product successfully", () => {
    SearchPage.searchForProduct(data.search.validTerm);
    SearchPage.submitSearch();
    cy.url().should("include", "/");
    SearchPage.verifySearchResultsExist();
  });

  // TEST 2: Search for non-existent product shows no results
  it("TC20 - should display empty results for invalid search", () => {
    SearchPage.searchForProduct(data.search.invalidTerm);
    SearchPage.submitSearch();
    SearchPage.verifyNoResults();
  });

  // TEST 3: Display product details when clicking a product card
  it("TC21 - should view product details from home listing", () => {
    CategoryPage.openFirstProduct();
    ProductPage.verifyProductUrl();
    ProductPage.verifyProductTitle();
    ProductPage.verifyAddToCartButton();
  });

  // TEST 4: Add product to cart and see success message
  it("TC22 - should add product to cart from home list", () => {
    CategoryPage.openFirstProduct();
    ProductPage.addToCart();
    ProductPage.verifyAddToCartSuccess();
    ProductPage.verifyProductUrl();
  });

  // TEST 5: Sort products by different options
  it("TC23 - should sort products by price ascending", () => {
    cy.get("select").first().should("be.visible");
    CategoryPage.sortBy(data.products.sortOptions.priceAscending);
    CategoryPage.verifyProductsDisplayed();
  });

  // TEST 6: Search and verify multiple results appear
  it("TC24 - should display multiple search results", () => {
    SearchPage.searchForProduct(data.search.validTerm2);
    SearchPage.submitSearch();
    SearchPage.verifyMultipleResultsExist();
  });

  // TEST 7: Verify product card contains price information
  it("TC25 - should display product price on listing", () => {
    cy.get('a[href*="/product/"]').first().within(() => {
      cy.get("h5, h4, span, p").should("have.length.greaterThan", 0);
    });
    cy.contains("$").should("be.visible");
  });

});

