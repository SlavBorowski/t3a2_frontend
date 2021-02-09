import { userBuilder } from "../support/generate";

describe("when signing up user", () => {
  it("should be redirected to /profile form and have a JWT in local storage", () => {
    const user = userBuilder();
    cy.visit("/");
    cy.findByText(/Sign Up/i).click();
    cy.findByLabelText(/Email/).type(user.email);
    cy.findByLabelText(/Password/).type(user.password);
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:8080/profile");
    cy.window().its("localStorage.token").should("be.a", "string");
  });
});