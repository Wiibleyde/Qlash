describe("Login Register Page", () => {
  it("should display the login form", () => {
    cy.visit("/signup");
    cy.get("h2").should("contain", "Sign In");
    cy.get('input[id="email"]').should("be.visible");
    cy.get('input[id="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Se connecter");
  });

  it("should display the register form", () => {
    cy.visit("/signup");
    cy.get("h2").should("contain", "Sign Up");
    cy.get('input[id="username"]').should("be.visible");
    cy.get('input[id="signin-email"]').should("be.visible");
    cy.get('input[id="signin-password"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "S'inscrire");
  });
});
