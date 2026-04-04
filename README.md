# Mohaned Khaled Ali
# 221011513

# Cypress Toolshop Project (E2E Test Suite)

This project contains simple, robust Cypress E2E test cases for the demo site **Practice Software Testing (Toolshop)**.

## Setup & Execution

Install dependencies:
```bash
npm install
```

Run Cypress visually:
```bash
npx cypress open
```

Run headless:
```bash
npx cypress run
```

## Project Structure & Architecture

The project successfully implements Cypress best practices:
- **Assertions:** At least 3 assertions per test case (`.should()`, `url()`, etc.) to verify states securely.
- **Custom Commands:** All meaningful user actions are encapsulated into custom Cypress commands.
- **Hooks & Fixtures:** `before()` loads the user and environment data from `cypress/fixtures/toolshop.json` and `beforeEach()` is used to reset the state using the custom `cy.visitHome()` command.
- **Separation of Concerns:** The monolithic `commands.js` was split into domain-specific modules.

### Custom Commands 

Located under `cypress/support/commands/`:

**Navigation (`navigation.commands.js`)**
- `cy.visitHome()`
- `cy.navTo(label)`
- `cy.openCategoriesMenu()`
- `cy.chooseCategory(categoryLabel)`
- `cy.searchProducts(term)`
- `cy.submitSearch()`
- `cy.selectSortByIndex(index)`

**Products & Cart (`product.commands.js`)**
- `cy.openFirstProductCard()`
- `cy.addToCartFromProduct()`
- `cy.openCart()`

**Authentication (`auth.commands.js`)**
- `cy.goToSignIn()`
- `cy.login(email, password)`
- `cy.submitLogin()`
- `cy.logout()`

**Contact (`contact.commands.js`)**
- `cy.goToContact()`
- `cy.fillContactForm(data)`
- `cy.submitContactForm()`

## Test Cases (TC01 - TC20)

All tests live in `cypress/e2e/toolshop/toolshop.cy.js`.

### Navigation & General UI
- **TC01** - should load the home page
- **TC02** - should display the main navbar links
- **TC03** - should open the categories menu
- **TC04** - should navigate to a category from the menu
- **TC05** - should allow selecting an option from sort dropdown

### Product & Cart Flow
- **TC06** - should open a product details page
- **TC07** - should update cart state after adding a product

### Auth (Positive & Flow)
- **TC08** - should show sign in link on public home
- **TC09** - should load sign in page with required fields
- **TC12** - should submit login with fixture customer user
- **TC13** - should remain in public state when not authenticated

### Auth (Negative / Validation)
- **TC10** - should show login validation errors for empty fields
- **TC11** - should fail login with invalid credentials
- **TC16** - should reject login with wrong email and valid password
- **TC17** - should reject login with valid email and wrong password
- **TC18** - should reject login with invalid email format
- **TC19** - should reject login with admin email and wrong password
- **TC20** - should reject login with unknown email and random password

### Contact Form
- **TC14** - should load contact page with contact form
- **TC15** - should trigger contact form validation on empty submit