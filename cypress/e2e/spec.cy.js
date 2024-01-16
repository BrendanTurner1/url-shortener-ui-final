describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'example.json'
    })
    cy.visit('http://localhost:3000')
  })
  it('should display a page title', ()=> {
    cy.get('.app-title').contains('URL Shortener')
  })
  it('should have a form', ()=> {
    cy.contains('.app-form')
  })
})