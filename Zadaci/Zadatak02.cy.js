describe("Provjerava URL statuse", () => {
    
    it("Otvara i provjerava URL-ove", () => {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page");
        cy.url().should("contain", "Main_Page");
        cy.get("#vector-main-menu-dropdown").click();
        cy.contains("About Wikipedia").click();
        cy.url().should("contain", "Wikipedia:About");
        cy.url().should("not.contain", "Main_Page");
    })
})