describe("Testira funkcionalnosti wikipedije", () => {
    
    beforeEach(() => {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page");
    })

    it("Prvi korak", () => {
        cy.url().should("contain", "Main_Page");
        cy.get("#n-currentevents").click();
        cy.url().should("contain", "Current_events");
    })

    it("Drugi korak", () => {
        cy.url().should("contain", "Main_Page");
        cy.get("a[href='/wiki/Wikipedia:Contents']").click();
        cy.url().should("contain", "Wikipedia:Contents");
    })

    it("Treći korak", () => {
        cy.url().should("contain", "Main_Page");
        cy.get("#n-randompage").click();
        cy.url().should("not.contain", "Main_Page");
    })
})