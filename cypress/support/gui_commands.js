Cypress.Commands.add(
    "login",
    (
        username = Cypress.env("user_name"),
        password = Cypress.env("user_password"),
        { cacheSession = true } = {}
    ) => {
        const login = () => {
            cy.visit("/users/sign_in");

            cy.get('[data-qa-selector="login_field"]')
                .should("be.visible")
                .type(username);
            cy.get('[data-qa-selector="password_field"]', { log: false })
                .should("be.visible")
                .type(password);
            cy.get('[data-qa-selector="sign_in_button"]')
                .should("be.visible")
                .click();
        };

        const validate = () => {
            cy.visit("/");
            cy.location("pathname", { timeout: 1000 }).should(
                "not.eq",
                "/users/sign_in"
            );
        };

        const options = {
            cacheAcrossSpecs: true,
            validate,
        };

        if (cacheSession) {
            cy.session(username, login, options);
        } else {
            login();
        }
    }
);

Cypress.Commands.add("logout", () => {
    cy.get('[data-qa-selector="user_menu"]').should("be.visible").click();
    cy.get('[data-qa-selector="sign_out_link"]').should("be.visible").click();
});

Cypress.Commands.add("gui_createProject", (project) => {
    cy.visit("/projects/new");

    cy.get("#project_name").should("be.visible").type(project.name);
    cy.get("#project_description")
        .should("be.visible")
        .type(project.description);
    cy.get("#project_initialize_with_readme").should("be.visible").check();
    cy.contains("Create project").should("be.visible").click();
});

Cypress.Commands.add("gui_createIssue", (issue) => {
    cy.visit(`/${Cypress.env("user_name")}/${issue.project.name}/issues/new`);

    cy.get(".qa-issuable-form-title").should("be.visible").type(issue.title);
    cy.get("#issue_description").should("be.visible").type(issue.description);

    cy.get(".qa-issuable-create-button").click();
});

Cypress.Commands.add("gui_setLabelOnIssue", (label) => {
    cy.get(".qa-edit-link-labels").click();
    cy.contains(label.name).click();
    cy.get("body").click();
});

Cypress.Commands.add("gui_setMilestoneOnIssue", (milestone) => {
    cy.get(".block.milestone .edit-link").click();
    cy.contains(milestone.title).click();
});
