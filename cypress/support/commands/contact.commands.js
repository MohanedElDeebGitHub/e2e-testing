Cypress.Commands.add("goToContact", () => {
  cy.navTo("Contact");
  cy.location("pathname").should("include", "/contact");
});

Cypress.Commands.add("fillContactForm", ({ firstName, lastName, email, subject, message }) => {
  cy.get('input[name="first_name"], input[placeholder*="first" i]').first().clear().type(firstName);
  cy.get('input[name="last_name"], input[placeholder*="last" i]').first().clear().type(lastName);
  cy.get('input[type="email"]').first().clear().type(email);
  cy.get('input[name="subject"], input[placeholder*="subject" i]').first().clear().type(subject);
  cy.get('textarea[name="message"], textarea[placeholder*="message" i]').first().clear().type(message);
});

Cypress.Commands.add("submitContactForm", () => {
  cy.get('button[type="submit"], input[type="submit"]', { timeout: 20000 }).first().should("be.visible").click();
});