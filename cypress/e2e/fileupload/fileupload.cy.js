// File Upload Tests - Simple cypress-file-upload plugin examples using actual website elements
describe("File Upload: e2e", () => {
  beforeEach(() => {
    // Visit the contact page which has a real file input
    cy.visit("/contact");
  });

  // TEST 1: Upload a single file from fixtures
  it("FU01 - should upload single file (file1.docx)", () => {
    cy.get('input[type="file"]').attachFile("file1.docx");
    cy.get('input[type="file"]').should("have.value", "C:\\fakepath\\file1.docx");
  });

  // TEST 2: Upload multiple files from fixtures
  it("FU02 - should upload multiple files (file1.docx and file2.txt)", () => {
    cy.get('input[type="file"]').attachFile(["file1.docx", "file2.txt"]);
    cy.get('input[type="file"]').should("have.value", "C:\\fakepath\\file1.docx");
  });

  // TEST 3: Upload text file from fixtures
  it("FU03 - should upload text file (file2.txt)", () => {
    cy.get('input[type="file"]').attachFile("file2.txt");
    cy.get('input[type="file"]').should("have.value", "C:\\fakepath\\file2.txt");
  });
});
