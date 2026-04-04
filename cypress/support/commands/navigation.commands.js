Cypress.Commands.add("visitHome", () => {
  cy.visit("/#/");
  cy.url().should("include", "/#/");
});

Cypress.Commands.add("navTo", (label) => {
  cy.contains("a", label, { timeout: 20000 }).should("be.visible").click();
});

Cypress.Commands.add("openCategoriesMenu", () => {
  cy.contains("a", "Categories", { timeout: 20000 }).should("be.visible").click();
});

Cypress.Commands.add("chooseCategory", (categoryLabel) => {
  cy.openCategoriesMenu();
  cy.contains("a,button", categoryLabel, { timeout: 20000 }).should("be.visible").click();
});

Cypress.Commands.add("searchProducts", (term) => {
  cy.get('input[type="search"]', { timeout: 20000 }).first().should("be.visible").clear().type(term);
});

Cypress.Commands.add("submitSearch", () => {
  cy.get('button[type="submit"]').first().should("be.visible").click();
});

Cypress.Commands.add("selectSortByIndex", (index) => {
  cy.get("select", { timeout: 20000 }).first().should("be.visible").select(index);
});