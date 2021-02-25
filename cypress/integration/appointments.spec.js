describe("Appointments", () => {
  //on startup goes to home and finds the day Monday
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset"); //resets database each time for testing
   cy.visit("/"); 
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
    //finds add button and clicks first one
    cy.get("[alt=Add]")
      .first()
      .click();
    //retrieves student name input and enters name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    //retrieves interviewer and selects
    cy.get('[alt="Sylvia Palmer"]')
      .click();
    cy.contains("Save")
      .click();
    //checks in show that the student name and interviewer are there
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true}); //force clicks b/c button is hidden
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones")
    cy.get("[alt='Tori Malcolm']")
      .click();
    cy.contains("Save")
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
 });