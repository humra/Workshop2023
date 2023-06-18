describe("Testira broj elemenata liste na stranici", () => {
    
    it("Pretražuje stranicu i broji elemente", () => {
        cy.visit("https://en.wikipedia.org/wiki/Software_testing");
        cy.get(".vector-toc-level-2").should("have.length.gte", 10);
        cy.get(".vector-toc-level-3").should("have.length.lte", 5);
        cy.get(".vector-toc-level-1").click({multiple: true});
    })
})