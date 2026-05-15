// HomePage - Methods for home page operations
class HomePage {
  visitHome() {
    cy.visitHome();
  }

  verifyHomeTitle(expectedTitle) {
    cy.title().should("include", expectedTitle);
  }

  verifyHomeUrl() {
    cy.url().should("include", "/#/");
  }

  verifyHomeLinks() {
    cy.contains("a", "Home").should("be.visible");
    cy.contains("a", "Contact").should("be.visible");
  }

  verifySignInLink() {
    cy.contains("a", "Sign in").should("be.visible");
  }

  verifyLinksExist() {
    cy.get("a").should("exist");
  }
}

export default new HomePage();
