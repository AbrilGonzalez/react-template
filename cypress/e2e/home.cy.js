describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('.App-link').contains("Learn React")
  })
})