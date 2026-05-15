// Open homepage
Cypress.Commands.add("visitHome", () => {
  cy.safeVisit("/#/");
  cy.url().should("include", "/#/");
});

// Navigate to a link in the menu (Home, Contact, Sign in)
Cypress.Commands.add("navTo", (label) => {
  cy.contains("a", label, { timeout: 20000 }).should("be.visible").click();
});

// Click the Categories button to open categories submenu
Cypress.Commands.add("openCategoriesMenu", () => {
  // Try to find Categories as a button (new website version)
  cy.contains("button", "Categories", { timeout: 20000 }).then(($btn) => {
    if ($btn.length > 0) {
      cy.wrap($btn).click();
    } else {
      // Fallback to link if button not found (old version)
      cy.contains("a", "Categories", { timeout: 20000 }).click();
    }
  });
});

// Select a specific category (e.g., "Hand Tools", "Power Tools")
Cypress.Commands.add("chooseCategory", (categoryLabel) => {
  cy.openCategoriesMenu();
  cy.contains("a,button", categoryLabel, { timeout: 20000 }).should("be.visible").click();
});

Cypress.Commands.add("searchProducts", (term) => {
  // Try multiple selectors for search input (homepage vs category page)
  cy.get('input[type="search"], input[name="search"], input[placeholder*="search" i]', { timeout: 20000 })
    .first()
    .should("be.visible")
    .clear()
    .type(term);
});

Cypress.Commands.add("submitSearch", () => {
  cy.get('button[type="submit"]').first().should("be.visible").click();
});

Cypress.Commands.add("selectSortByIndex", (index) => {
  cy.get("select", { timeout: 20000 }).first().should("be.visible").select(index);
});