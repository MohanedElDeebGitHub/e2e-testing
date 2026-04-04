Cypress.Commands.add("goToSignIn", () => {
  cy.navTo("Sign in");
  cy.location("pathname").should("include", "/auth/login");
});

Cypress.Commands.add("login", (email, password) => {
  cy.get('input[type="email"]', { timeout: 20000 }).should("be.visible").clear().type(email);
  cy.get('input[type="password"]').should("be.visible").clear().type(password, { log: false });
  cy.submitLogin();
});

Cypress.Commands.add("submitLogin", () => {
  cy.get('button[type="submit"], input[type="submit"]', { timeout: 20000 })
    .first()
    .should("be.visible")
    .click();
});

Cypress.Commands.add("logout", () => {
  cy.contains("a,button", /jane doe|john doe|my account|account/i, { timeout: 20000 })
    .should("be.visible")
    .click();

  cy.contains("a,button", /sign out|logout/i, { timeout: 20000 }).should("be.visible").click();
});