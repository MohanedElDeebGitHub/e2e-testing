// File Upload Tests - cypress-file-upload plugin using the contact page form
describe("File Upload: e2e", () => {
  /**
   * Navigate to the contact page and wait for the Angular app to fully render.
   *
   * Why failOnStatusCode:false?
   *   GitHub Actions IPs are sometimes rate-limited by Cloudflare. We handle
   *   that gracefully rather than letting Cypress crash immediately.
   *
   * Why select a subject?
   *   The contact form on practicesoftwaretesting.com conditionally renders
   *   `input[type="file"]` only after the user selects "Warranty" (or similar)
   *   from the Subject dropdown. Without this step the file input doesn't exist
   *   in the DOM, so the test always fails in CI (headless) where no prior
   *   session state carries the selection over.
   */
  const loadContactPageWithFileInput = () => {
    cy.visit("/contact", { failOnStatusCode: false, timeout: 60000 });

    // Wait for Angular to bootstrap — the form's email field is a reliable signal
    cy.get('input[type="email"], [data-cy="email"], [formcontrolname="email"]', {
      timeout: 30000,
    }).should("exist");

    // The subject select/dropdown must be set to a value that reveals the file
    // input. "Warranty" (index 3 on v5) is known to show the attachment field.
    // We try the select element first, then fall back to a type-able input.
    cy.get("body").then(($body) => {
      if ($body.find('select[name="subject"], select[formcontrolname="subject"], [data-cy="subject"] select').length > 0) {
        // It's a <select> dropdown — pick the last option which typically exposes the file input
        cy.get('select[name="subject"], select[formcontrolname="subject"], [data-cy="subject"] select')
          .first()
          .find("option")
          .last()
          .then(($opt) => {
            cy.get('select[name="subject"], select[formcontrolname="subject"], [data-cy="subject"] select')
              .first()
              .select($opt.val());
          });
      } else if ($body.find('[data-cy="subject"], [formcontrolname="subject"]').length > 0) {
        // It might be a custom dropdown or text input — type a subject
        cy.get('[data-cy="subject"], [formcontrolname="subject"]')
          .first()
          .clear()
          .type("Warranty");
      }
    });

    // Wait for the file input to appear after subject selection
    cy.get('input[type="file"]', { timeout: 15000 }).should("exist");
  };

  beforeEach(() => {
    loadContactPageWithFileInput();
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
