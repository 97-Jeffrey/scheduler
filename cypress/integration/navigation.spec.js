const { iteratee } = require("lodash")
const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Navigation",()=>{
  
  it('should visit root',()=>{
    cy.visit("/");
  });

  it("should navigate to Tuesday",()=>{
    cy.visit("/");
    cy.contains("div", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  });
})