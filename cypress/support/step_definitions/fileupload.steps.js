import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the file upload contact page", () => {
  cy.safeVisit("/contact");
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
