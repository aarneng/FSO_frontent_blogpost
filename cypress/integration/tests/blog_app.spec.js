describe("Blog app", function() {
  const user = {
    name: "Jack Napier",
    username: "joker",
    password: "secret"
  }

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("has login form shown by default", function() {
    cy.contains("Login to blogs app")
    cy.contains("username")
    cy.contains("password")
    cy.contains("login").click()
  })

  describe("Login", function() {
    it("login works after inputting a correct username and password", function() {
      cy.get("#username").type(user.username)
      cy.get("#password").type(user.password)
      cy.get("#login-button").click()
  
      cy.contains(`${user.name} is logged in`)
    })
    
    it("login doesn't work with a correct username but incorrect password", function() {
      cy.get("#username").type(user.username)
      cy.get("#password").type("not a secret")
      cy.get("#login-button").click()
  
      cy.get(".notification-error")
        .should("contain", "bad username/password")
        .and("have.css", "background-color", "rgb(255, 0, 0)")

      cy.get("html").should("not.contain", `${user.name} is logged in`)
    })
  
    it("login doesn't work with an incorrect username but correct password", function() {
      cy.get("#username").type("cool joker")
      cy.get("#password").type(user.password)
      cy.get("#login-button").click()

  
      cy.get(".notification-error")
        .should("contain", "bad username/password")
        .and("have.css", "background-color", "rgb(255, 0, 0)")

      cy.get("html").should("not.contain", `${user.name} is logged in`)
    })
  
    it("login doesn't work with an incorrect username and password", function() {
      cy.get("#username").type("cool joker")
      cy.get("#password").type("not a secret")
      cy.get("#login-button").click()
      
      cy.get(".notification-error")
        .should("contain", "bad username/password")
        .and("have.css", "background-color", "rgb(255, 0, 0)")

      cy.get("html").should("not.contain", `${user.name} is logged in`)
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.get("#username").type(user.username)
      cy.get("#password").type(user.password)
      cy.get("#login-button").click()
    })

    const blog = {
      title: "tha b3st title evr",
      author: "kewler than thou",
      url: "rickroll.com"
    }

    it("Has create blog button", function() {
      cy.contains("create new blog").click()
    })

    it("A new blog can be created", function() {
      cy.contains("create new blog").click()

      cy.get("#title").type(blog.title)
      cy.get("#author").type(blog.author)
      cy.get("#url").type(blog.url)

      // cy.wait(5000)
      cy.contains("button", "submit").click()

      cy.get(".notification")
        .should("contain", `new blog "${blog.title}" by ${blog.author} added`)
        .and("have.css", "background-color", "rgb(173, 255, 47)")
      
      cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").as("theButton")
      cy.get("@theButton").click()
      cy.get("@theButton").should("contain", "view less")
    })
  })

})
