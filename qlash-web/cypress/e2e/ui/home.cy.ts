//? This file is used by Cypress to run end-to-end tests for the home page of the Qlash web application.
//? It includes tests for the visibility of various elements on the home page, such as the
//? navigation bar, logo, text-image sections, and sidebar functionality.

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the home page", () => {
    cy.get("nav").should("be.visible");
    cy.get("img[alt='Qlash logo']").should("be.visible");
  });

  it("should display the first text-image section", () => {
    cy.get("div.h-screen").should("be.visible");
    cy.contains(
      "Créez, partagez et jouez à des quiz où et quand vous le souhaitez."
    ).should("be.visible");
    cy.get("img[src='/images/multiple-choice.svg']").should("be.visible");
  });

  it("should display the second text-image section", () => {
    cy.contains(
      "Trouvez des quiz amusants et intéressants pour améliorer vos connaissances."
    ).should("be.visible");
    cy.get("img[src='/images/questions.svg']").should("be.visible");
  });

  it("should open sidebar when clicking on the menu icon", () => {
    cy.get("button.inline-flex").click(); //* Open the sidebar

    cy.get("a[href='/create']").should("be.visible");
    cy.get("a[href='/create']").should("contain", "Host");
    cy.get("a[href='/join']").should("be.visible");
    cy.get("a[href='/join']").should("contain", "Join");
    cy.get("a[href='/signup']").should("be.visible");
    cy.get("a[href='/signup']").should("contain", "Log in");
    cy.get("a[href='/signup']").should("be.visible");
    cy.get("a[href='/signup']").should("contain", "Sign up");

    cy.get('button > svg path[d="M6 18L18 6M6 6l12 12"]').click(); //* Close the sidebar

    cy.get("a[href='/create']").should("not.be.visible");
    cy.get("a[href='/join']").should("not.be.visible");
    cy.get("a[href='/signup']").should("not.be.visible");
    cy.get('button > svg path[d="M6 18L18 6M6 6l12 12"]').should("not.exist");
  });
});
