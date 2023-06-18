describe("Testira broj elemenata na stranici", () => {
    
    it("Pretražuje stranicu i broji elemente", () => {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page");

        cy.get("#searchInput").type("Software testing");
        cy.get("#searchform").submit();
        cy.url().should("contain", "Software_testing");
        
        cy.contains("Software testing").should("have.length.gte", 1);
        cy.contains("Hamburger").should("not.exist");
        cy.get("h1").should("have.length", 1);
        cy.get("h2").should("have.length.gte", 1);
        cy.get("h4").should("have.length.lte", 5);
    })
})