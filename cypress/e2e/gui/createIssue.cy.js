import { faker } from "@faker-js/faker";

const options = { env: { snapshotOnly: true } };

describe("Create issue", options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
        },
    };

    beforeEach(() => {
        cy.api_deleteProjects();
        cy.login();
        cy.api_createProject(issue.project);
    });

    it("sucessfully", () => {
        cy.gui_createIssue(issue);

        cy.get(".qa-title").contains(issue.title);
        cy.contains(issue.description);
    });
});
