// SearchPage - Methods for search operations
class SearchPage {
  searchForProduct(searchTerm) {
    cy.searchProducts(searchTerm);
  }

  submitSearch() {
    cy.submitSearch();
  }

  verifySearchResultsExist() {
    cy.get('a[href*="/product/"]').should("have.length.greaterThan", 0);
  }

  verifySearchResultsCount(expectedCount) {
    cy.get('a[href*="/product/"]').should("have.length", expectedCount);
  }

  verifyMultipleResultsExist() {
    cy.get('a[href*="/product/"]').should("have.length.greaterThan", 1);
  }

  verifyNoResults() {
    cy.get('a[href*="/product/"]').should("have.length", 0);
  }
}

export default new SearchPage();
