// ProductPage - Methods for product details page operations
class ProductPage {
  verifyProductUrl() {
    cy.url().should("include", "/product/");
  }

  verifyProductTitle() {
    cy.get("h1").should("be.visible");
  }

  verifyAddToCartButton() {
    cy.contains("button", "Add to cart").should("be.visible");
  }

  addToCart() {
    cy.addToCartFromProduct();
  }

  verifyAddToCartSuccess() {
    cy.contains("body", "added").should("be.visible");
  }

  verifyProductDetailsVisible() {
    cy.get("h1").should("be.visible");
  }
}

export default new ProductPage();
