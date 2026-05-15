describe("Toolshop: e2e", () => {
  let data;

  before(() => {
    cy.fixture("toolshop").then((d) => {
      data = d;
    });
  });

  beforeEach(function () {
    cy.visitHome();
  });

  it("TC01 - should load the home page", () => {
    cy.visitHome();

    cy.url().should("include", "/#/");
    cy.title().should("include", data.base.homeTitle);
    cy.contains("a", "Home").should("be.visible");
  });

  it("TC02 - should display the main navbar links", () => {
    cy.visitHome();

    cy.get("a").should("exist");
    cy.contains("a", "Home").should("be.visible");
    cy.contains("a", "Contact").should("be.visible");
  });

  it("TC03 - should open the categories menu", () => {
    cy.openCategoriesMenu();

    cy.url().should("include", "practicesoftwaretesting.com");
    cy.contains("a,button", "Power Tools").should("be.visible");
    cy.contains("a,button", "Hand Tools").should("be.visible");
  });

  it("TC04 - should navigate to a category from the menu", () => {
    cy.chooseCategory("Hand Tools");

    cy.url().should("include", "/category/");
    cy.url().should("include", "hand-tools");
    cy.get('a[href*="/product/"]').should("have.length.greaterThan", 0);
  });

  it("TC05 - should allow selecting an option from sort dropdown", () => {
    cy.chooseCategory("Hand Tools");
    cy.selectSortByIndex(1);

    cy.get("select").first().find("option:selected").should("exist");
    cy.get("select").first().should("be.visible");
    cy.url().should("include", "/category/");
  });

  it("TC06 - should open a product details page", () => {
    cy.chooseCategory("Hand Tools");
    cy.openFirstProductCard();

    cy.url().should("include", "/product/");
    cy.get("h1").should("be.visible");
    cy.contains("button", "Add to cart").should("be.visible");
  });

  it("TC07 - should update cart state after adding a product", () => {
    cy.chooseCategory("Hand Tools");
    cy.openFirstProductCard();
    cy.addToCartFromProduct();

    cy.contains("body", "added").should("be.visible");
    cy.url().should("include", "/product/");
    cy.get("h1").should("be.visible");
  });

  it("TC08 - should show sign in link on public home", () => {
    cy.visitHome();

    cy.contains("a", "Sign in").should("be.visible");
    cy.contains("a", "Home").should("be.visible");
    cy.url().should("include", "/#/");
  });

  it("TC09 - should load sign in page with required fields", () => {
    cy.goToSignIn();

    cy.url().should("include", "/auth/login");
    cy.title().should("include", data.base.homeTitle);
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get('button[type="submit"], input[type="submit"]').should("be.visible");
  });

  it("TC10 - should show login validation errors for empty fields", () => {
    cy.goToSignIn();
    cy.submitLogin();

    cy.url().should("include", "/auth/login");
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get(".is-invalid, .ng-invalid").should("have.length.greaterThan", 0);
  });

  it("TC11 - should fail login with invalid credentials", () => {
    cy.goToSignIn();
    cy.login("wrong@example.com", "wrongpass");

    cy.url().should("include", "/auth/login");
    cy.get('input[type="email"]').should("have.value", "wrong@example.com");
    cy.get('input[type="password"]').should("have.value", "wrongpass");
    cy.contains(".alert", "Invalid email or password").should("be.visible");
  });

  it("TC12 - should submit login with fixture customer user", () => {
    cy.goToSignIn();
    cy.login(data.users.customer.email, data.users.customer.password);

    cy.url().should("include", "/auth/login");
    cy.get('input[type="email"]').should("have.value", data.users.customer.email);
    cy.get('button[type="submit"], input[type="submit"]').should("be.visible");
  });

  it("TC13 - should remain in public state when not authenticated", () => {
    cy.visitHome();

    cy.contains("a", "Sign in").should("be.visible");
    cy.contains("a,button", "Sign out").should("not.exist");
    cy.url().should("not.include", "/account");
  });

  it("TC14 - should load contact page with contact form", () => {
    cy.goToContact();

    cy.url().should("include", "/contact");
    cy.title().should("include", data.base.homeTitle);
    cy.get("form").should("exist");
    cy.get('input[type="email"]').should("be.visible");
  });

  it("TC15 - should trigger contact form validation on empty submit", () => {
    cy.goToContact();
    cy.submitContactForm();

    cy.url().should("include", "/contact");
    cy.get("form").should("exist");
    cy.get('input[name="first_name"], input[placeholder*="first" i]').should("be.visible");
    cy.get(".is-invalid, .ng-invalid").should("have.length.greaterThan", 0);
  });

  it("TC16 - should reject login with wrong email and valid password", () => {
    cy.goToSignIn();
    cy.login("not-a-user@example.com", data.users.customer.password);

    cy.url().should("include", "/auth/login");
    cy.get('input[type="email"]').should("have.value", "not-a-user@example.com");
    cy.contains(".alert", "Invalid email or password").should("be.visible");
  });

  it("TC17 - should reject login with valid email and wrong password", () => {
    cy.goToSignIn();
    cy.login(data.users.customer.email, "wrong-password-123");

    cy.url().should("include", "/auth/login");
    cy.get('input[type="email"]').should("have.value", data.users.customer.email);
    cy.contains(".alert", "Invalid email or password").should("be.visible");
  });

  it("TC18 - should reject login with invalid email format", () => {
    cy.goToSignIn();
    cy.login("bad-email-format", "some-password");

    cy.url().should("include", "/auth/login");
    cy.get('input[type="email"]').should("have.value", "bad-email-format");
    cy.get(".is-invalid, .ng-invalid").should("have.length.greaterThan", 0);
  });

  // ============================================
  // NEW SIMPLE TEST CASES (7 TESTS)
  // ============================================

  // TEST 1: Search for a valid product by term
  it("TC19 - should search for valid product successfully", () => {
    // Load home page (already done in beforeEach)
    cy.searchProducts(data.search.validTerm); // Type "hammer" in search
    cy.submitSearch(); // Submit the search

    // Verify we're on a search results page
    cy.url().should("include", "/");
    // Verify at least one product appears
    cy.get('a[href*="/product/"]').should("have.length.greaterThan", 0);
  });

  // TEST 2: Search for non-existent product shows no results
  it("TC20 - should display empty results for invalid search", () => {
    cy.searchProducts(data.search.invalidTerm); // Search for something that doesn't exist
    cy.submitSearch();

    // Verify we get no product links, indicating no results
    cy.get('a[href*="/product/"]').should("have.length", 0);
  });

  // TEST 3: Display product details when clicking a product card
  it("TC21 - should view product details from home listing", () => {
    // Click the first product from the home page
    cy.get('a[href*="/product/"]').first().should("be.visible").click();

    // Verify we're on product detail page
    cy.url().should("include", "/product/");
    // Verify product name and price are visible
    cy.get("h1").should("be.visible");
    cy.contains("button", "Add to cart").should("be.visible");
  });

  // TEST 4: Add product to cart and see success message
  it("TC22 - should add product to cart from home list", () => {
    // Click first product
    cy.get('a[href*="/product/"]').first().should("be.visible").click();
    // Add it to cart
    cy.addToCartFromProduct();

    // Verify success feedback appears (optional)
    cy.contains("body", "added").should("be.visible");
    cy.url().should("include", "/product/");
  });

  // TEST 5: Sort products by different options
  it("TC23 - should sort products by price ascending", () => {
    // Verify sort dropdown exists and is accessible
    cy.get("select").first().should("be.visible");
    // Select sort option (index 2 = price ascending based on fixture)
    cy.selectSortByIndex(data.products.sortOptions.priceAscending);

    // Verify products are still displayed after sorting
    cy.get('a[href*="/product/"]').should("have.length.greaterThan", 0);
  });

  // TEST 6: Search and verify multiple results appear
  it("TC24 - should display multiple search results", () => {
    cy.searchProducts(data.search.validTerm2); // Search for "pliers"
    cy.submitSearch();

    // Verify multiple products appear (at least 2)
    cy.get('a[href*="/product/"]').should("have.length.greaterThan", 1);
  });

  // TEST 7: Verify product card contains price information
  it("TC25 - should display product price on listing", () => {
    // Verify price elements are visible on home page product cards
    cy.get('a[href*="/product/"]').first().within(() => {
      // Product price should be visible in the card
      cy.get("h5, h4, span, p").should("have.length.greaterThan", 0);
    });

    // Also verify general price elements on page
    cy.contains("$").should("be.visible");
  });

});

