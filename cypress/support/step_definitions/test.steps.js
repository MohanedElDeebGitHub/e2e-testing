import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../POM/index.js";

// TC01 - Load home page
When("I visit the home page", () => {
  HomePage.visitHome();
});

Then("the home page title should be displayed", () => {
  HomePage.verifyHomeTitle();
});

Then("the home url should contain the hash route", () => {
  HomePage.verifyHomeUrl();
});

// TC02 - Display navbar links
Given("I am on the home page", () => {
  HomePage.visitHome();
});

Then("the navbar should display the Home link", () => {
  HomePage.verifyHomeLinks();
});

Then("the navbar should display the Categories button", () => {
  cy.contains("button", "Categories").should("exist");
});

Then("the navbar should display the Contact link", () => {
  cy.contains("a", "Contact").should("exist");
});

Then("the navbar should display the Sign in link", () => {
  HomePage.verifySignInLink();
});

// TC03 - Open categories menu
When("I click the Categories button", () => {
  HomePage.openCategoriesMenu();
});

Then("the categories menu should be visible", () => {
  HomePage.verifyCategoriesMenuVisible();
});
