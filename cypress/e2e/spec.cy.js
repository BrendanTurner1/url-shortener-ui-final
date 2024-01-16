describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'example.json'
    })
    cy.visit('http://localhost:3000')
  })
  it('should display a page title, form and existing urls', ()=> {
    cy.get('.app-title').contains('URL Shortener')
    cy.get('.app-form').should('exist')
    cy.get("input[name='title']").should('contain', '')
    cy.get("input[name='url']").should('contain', '')
    cy.get('button').should('contain', 'Shorten Please!')
    cy.get('.url').should('have.length', 1)
    cy.get('.url').children('h3').first().should('contain', 'Awesome photo')
    cy.get('.url').children('a').first().should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('.url').children('p').first().should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })
  it('should update the form as it is filled', ()=> {
    cy.get("input[name='title']").type('test').should('have.value', 'test')
    cy.get("input[name='url']").type('https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2022-07/shutterstock_1531258040.jpg?itok=5ZyB0u7q')
    .should('have.value', 'https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2022-07/shutterstock_1531258040.jpg?itok=5ZyB0u7q')
  })
  it('should be able to POST and update dom', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json'},
        body: {
          id: 2,
          long_url: "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2022-07/shutterstock_1531258040.jpg?itok=5ZyB0u7q",
          title: "Anxiety",
          short_url: 'http://localhost:3001/useshorturl/2'
        }
    })
    cy.get("input[name='title']").type('Anxiety').should('have.value', 'Anxiety')
    cy.get("input[name='url']").type('https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2022-07/shutterstock_1531258040.jpg?itok=5ZyB0u7q')
    .get('button').click()
    cy.get('.url').should('have.length', 2)
    cy.get('.url').children('h3').first().should('contain', 'Awesome photo')
    cy.get('.url').children('a').first().should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('.url').children('p').first().should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    cy.get('.url').children('h3').last().should('contain', 'Anxiety')
    cy.get('.url').children('a').last().should('contain', 'http://localhost:3001/useshorturl/2')
    cy.get('.url').children('p').last().should('contain', 'https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2022-07/shutterstock_1531258040.jpg?itok=5ZyB0u7q')

  })

})