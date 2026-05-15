// ContactPage - Methods for contact form operations
class ContactPage {
  navigateToContact() {
    cy.goToContact();
  }

  verifyContactPageUrl() {
    cy.url().should("include", "/contact");
  }

  verifyContactFormVisible() {
    cy.get("form").should("exist");
    cy.get('input[type="email"]').should("be.visible");
  }

  fillContactForm(contactData) {
    cy.fillContactForm(contactData);
  }

  submitContactForm() {
    cy.submitContactForm();
  }

  verifyContactFormValidationErrors() {
    cy.get('input[name="first_name"], input[placeholder*="first" i]').should("be.visible");
    cy.get(".is-invalid, .ng-invalid").should("have.length.greaterThan", 0);
  }
}

export default new ContactPage();
