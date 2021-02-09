
import { userBuilder } from "../support/generate";

describe("signup, fill out profile form and see info on profile page, then fill out form", () => {
  it("should be able to click on submit and be navigated to /profile form", () => {
  
    const user = userBuilder();
    cy.visit("/sign-up")
    cy.findByLabelText(/email/i).type(user.email)
    cy.findByLabelText(/password/i).type(user.password)
    cy.get("form").submit()
    
    cy.url().should('eql', "http://localhost:8080/profile")
    cy.url().should('eql', "http://localhost:8080/profile/form")
    
    cy.fixture("user1.json").then((user) => {
      cy.findByLabelText(/name/i).type(user.name)
      cy.findByLabelText(/Favorite/i).type(user.favorite_place)
      cy.findByLabelText(/bio/i).type(user.bio)
    })
    const fileName= 'logo192.png'
    cy.fixture('logo192.png')
    .then(Cypress.Blob.base64StringToBlob)
    .then((fileContent) => {
      cy.findByLabelText(/image/i).attachFile({fileContent, fileName, mimeType: 'image/**'});
    })
    cy.get("form").submit()
    cy.url().should('eql', "http://localhost:8080/profile")
  });
  
  after(() => {
    // we need to clean up after we run the tests
    window.localStorage.removeItem("token")
    window.sessionStorage.removeItem("auth")
  })
});