describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'test',
            name: 'TestMan',
            password: '1234'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('log in to application')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('log in', function () {
        it('user can log in', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()

            cy.contains('TestMan logged in')
        })

        it('can`t log in with incorrect credentials', function () {
            cy.get('#username').type('aaa')
            cy.get('#password').type('bbbbb')
            cy.get('#login-button').click()

            cy.contains('invalid username or password')
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'test', password: '1234'
            }).then(response => {
                localStorage.setItem('loggedUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('create a new blog', function () {
            cy.contains('create blog').click()
            cy.get('#author-input').type('Biba Boba')
            cy.get('#title-input').type('Best article Ever')
            cy.get('#url-input').type('http://something')
            cy.get('#create-button').click()

            cy.contains('Biba Boba')

            cy.request('POST', 'http://localhost:3003/api/testing/reset')
        })

        describe('after creating blog', function () {
            beforeEach(function() {
                cy.contains('create blog').click()
                cy.get('#title-input').type('Worst article Ever')
                cy.get('#author-input').type('Aboba')
                cy.get('#url-input').type('http://somehell')
                cy.get('#create-button').click()
            })

            it('like a blog', function () {
                cy.get('.view-button').click()
                cy.contains('0')
                cy.get('.like-button').click()
                cy.contains('1')
            })

            it('check filter', function () {
                cy.contains('create blog').click()
                cy.get('#author-input').clear()
                cy.get('#author-input').type('Biba Boba')
                cy.get('#title-input').clear()
                cy.get('#title-input').type('Best article Ever')
                cy.get('#url-input').type('http://something')
                cy.get('#create-button').click()

                setTimeout(() => {
                    cy.get('.view-button').eq(0).click()
                }, 500)
                cy.get('.like-button').eq(0).click()

                cy.get('.view-button').eq(1).click()
                cy.get('.like-button').eq(1).click()
                cy.get('.like-button').eq(1).click()

                cy.reload(true, { timeout: 500 })

                cy.get('.blog').eq(0).should('contain', 'Best article Ever')
                cy.get('.blog').eq(1).should('contain', 'Worst article Ever')
            })

            it('delete blog', function () {
                cy.get('.view-button').click()
                cy.get('.delete-button').click()
                cy.not('contain', 'Aboba')
            })
        })
    })




})