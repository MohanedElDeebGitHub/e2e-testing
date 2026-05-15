// LoginPage - Methods for login and authentication operations
class LoginPage {
  navigateToSignIn() {
    cy.goToSignIn();
  }

  verifyLoginPageUrl() {
    cy.url().should("include", "/auth/login");
  }

  verifyLoginFormVisible() {
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get('button[type="submit"], input[type="submit"]').should("be.visible");
  }

  login(email, password) {
    cy.login(email, password);
  }

  verifyLoginError() {
    cy.contains(".alert", "Invalid email or password").should("be.visible");
  }

  verifyValidationErrors() {
    cy.get(".is-invalid, .ng-invalid").should("have.length.greaterThan", 0);
  }

  verifyEmailFieldValue(email) {
    cy.get('input[type="email"]').should("have.value", email);
  }

  verifyPasswordFieldValue(password) {
    cy.get('input[type="password"]').should("have.value", password);
  }

  submitLogin() {
    cy.submitLogin();
  }
}

export default new LoginPage();
