// File Upload Tests - Simple cypress-file-upload plugin examples using actual website elements
describe("File Upload: e2e", () => {
  /**
   * CI-safe visit helper: retries the page load if the server returns 403.
   * GitHub Actions IPs are sometimes blocked by practice sites. Using
   * failOnStatusCode: false + manual retry prevents false test failures.
   */
  const visitContact = () => {
    cy.visit("/contact", {
      failOnStatusCode: false,
      timeout: 60000,
    });
    // If the page returned 403, wait and reload once before continuing
    cy.document().then((doc) => {
      if (doc.title === "" || doc.body.innerText.includes("403")) {
        cy.wait(3000);
        cy.reload();
      }
    });
  };

  beforeEach(() => {
    visitContact();
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
