describe("Testira broj elemenata liste na stranici", () => {
    
    it("Pretražuje stranicu i broji elemente", () => {
        cy.visit("https://en.wikipedia.org/wiki/Software_testing");
        cy.get(".vector-toc-level-1").should("have.length", 20);
        cy.get(".vector-toc-level-1").first().should("contain.text", "(Top)");
        cy.get(".vector-toc-level-1").last().should("contain.text", "External links");
        
        cy.get("#firstHeading").parent().parent()
        .should("have.id", "content")
        .should("not.have.class", "mw-indicators");
    })
})