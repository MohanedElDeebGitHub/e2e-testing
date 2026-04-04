Cypress.Commands.add("openFirstProductCard", () => {
  cy.get('a[href*="/product/"]', { timeout: 20000 }).first().should("be.visible").click();
});

Cypress.Commands.add("addToCartFromProduct", () => {
  cy.contains("button", "Add to cart", { timeout: 20000 }).should("be.visible").click();
});

Cypress.Commands.add("openCart", () => {
  cy.contains("a,button", "Cart", { timeout: 20000 }).first().should("be.visible").click();
});