describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('.App').contains("Emerald")
  })
})