describe("Testira funkcionalnost registracije", () => {
    
    it("Izvršava registraciju", () => {
        cy.visit("https://automationexercise.com/")
        cy.url().should("contain", "automationexercise.com")

        cy.get("a[href='/login']").click()
        cy.url().should("contain", "/login")

        cy.get("input[name='name']").type("MHuremovic")
        cy.get("form[action='/signup'] > input[name='email']").type("huremovic@harakirimail.com")
        cy.get("form[action='/signup']").submit()
        cy.contains("Enter Account Information").should("exist")

        cy.get("#id_gender1").check()
        cy.get("#password").type("Pa$$w0rd")
        
        cy.get("#days").select(18)
        cy.get("#months").select(1)
        //cy.get("#months").select("January")
        //cy.get("#years").click()
        cy.get("#years").select("1995")
        cy.get("#newsletter").check()

        cy.get("#first_name").type("Matija")
        cy.get("#last_name").type("Huremović")
        cy.get("#company").type("King ICT")
        cy.get("#address1").type("Buzinski prilaz 10")
        cy.get("#country").select("New Zealand")
        cy.get("#state").type("Newest Zealand")
        cy.get("#city").type("Buzin")
        cy.get("#zipcode").type("10000")
        cy.get("#mobile_number").type("0981234567")

        cy.contains("Create Account").click()
        cy.contains("Account Created!").should("exist")
        cy.get("a[href='/']").first().click()
        cy.get("a[href='/delete_account']").click()
        cy.contains("Account Deleted!").should("exist")
    })
})