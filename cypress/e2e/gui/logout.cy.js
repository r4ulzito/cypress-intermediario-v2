describe("Logout", () => {
    beforeEach(() => {
        cy.login();
        cy.visit("/");
    });

    it("sucessfully", () => {
        cy.logout();

        cy.get('[data-qa-selector="login_field"]').should("be.visible");
        cy.url().should(
            "be.equal",
            `${Cypress.config("baseUrl")}/users/sign_in`
        );
    });
});
