describe("Testira search funkciju", () => {
    
    it("Pretražuje stranicu", () => {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page");
        
        cy.get("#searchInput").type("Quality assurance");
        cy.get("#searchform").submit();

        cy.url().should("contain", "Quality_assurance");
        cy.get("#searchInput").type("software development");
        cy.get("#searchform").submit();
        cy.url().should("contain", "Software_development");

        var wikiSearch = "test automation";
        cy.get("#searchInput").type(wikiSearch);
        cy.get("#searchform").submit();
        cy.url().should("contain", "Test_automation");

        var currentURL = cy.url();
    })
})