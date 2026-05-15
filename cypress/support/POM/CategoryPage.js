// CategoryPage - Methods for category and product listing operations
class CategoryPage {
  openCategoriesMenu() {
    cy.openCategoriesMenu();
  }

  selectCategory(categoryLabel) {
    cy.chooseCategory(categoryLabel);
  }

  verifyCategoriesMenuVisible() {
    cy.contains("a,button", "Power Tools").should("be.visible");
    cy.contains("a,button", "Hand Tools").should("be.visible");
  }

  verifyCategoryUrl(categoryName) {
    cy.url().should("include", "/category/");
    cy.url().should("include", categoryName);
  }

  verifyProductsDisplayed() {
    cy.get('a[href*="/product/"]').should("have.length.greaterThan", 0);
  }

  sortBy(sortIndex) {
    cy.selectSortByIndex(sortIndex);
  }

  verifySortDropdownSelected() {
    cy.get("select").first().find("option:selected").should("exist");
    cy.get("select").first().should("be.visible");
  }

  openFirstProduct() {
    cy.openFirstProductCard();
  }
}

export default new CategoryPage();
