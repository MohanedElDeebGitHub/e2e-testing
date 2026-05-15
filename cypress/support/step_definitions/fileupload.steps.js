import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the file upload contact page", () => {
  cy.safeVisit("/contact");

  // Wait for Angular to mount the form
  cy.get('input[type="email"], [formcontrolname="email"]', { timeout: 30000 }).should("exist");

  // Select a subject that reveals input[type="file"]
  cy.get("body").then(($body) => {
    if ($body.find('select[formcontrolname="subject"], select[name="subject"]').length > 0) {
      cy.get('select[formcontrolname="subject"], select[name="subject"]')
        .first()
        .find("option")
        .last()
        .then(($opt) => {
          cy.get('select[formcontrolname="subject"], select[name="subject"]')
            .first()
            .select($opt.val());
        });
    }
  });

  // Confirm the file input is now in the DOM
  cy.get('input[type="file"]', { timeout: 15000 }).should("exist");
});

When("I upload file1.docx", () => {
  cy.get('input[type="file"]').attachFile("file1.docx");
});

When("I upload file1.docx and file2.txt", () => {
  cy.get('input[type="file"]').attachFile(["file1.docx", "file2.txt"]);
});

When("I upload file2.txt", () => {
  cy.get('input[type="file"]').attachFile("file2.txt");
});

Then("the file should be uploaded successfully", () => {
  cy.get('input[type="file"]').invoke("val").should("include", "C:\\fakepath\\");
});

Then("the files should be uploaded successfully", () => {
  cy.get('input[type="file"]').invoke("val").should("include", "C:\\fakepath\\");
});
