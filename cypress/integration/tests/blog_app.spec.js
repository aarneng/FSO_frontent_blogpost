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
      url: "rickroll.com",
      likes: 0
    }

    it("Has create blog button", function() {
      cy.contains("create new blog").click()
    })


    describe("blogs work as expected", function() {
      beforeEach(function() {
        cy.contains("create new blog").click()
  
        cy.get("#title").type(blog.title)
        cy.get("#author").type(blog.author)
        cy.get("#url").type(blog.url)
  
        cy.contains("button", "submit").click()
      })
      it("A newly created blog has correct attributes", function() {
        cy.get(".notification")
          .should("contain", `new blog "${blog.title}" by author ${blog.author} added`)
          .and("have.css", "background-color", "rgb(173, 255, 47)")
      })
      it("pressing view/view less buttons works", function() {
        cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").as("theButton")
        cy.get("@theButton").click()
        cy.contains("view less")
  
        cy.contains(`"${blog.title}" by ${blog.author}`).parent()
          .contains(blog.url)
          .contains(blog.likes)
          .contains(user.name)
        
        cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").contains("view less").as("theButton")
        cy.get("@theButton").click()

        cy.contains(`"${blog.title}" by ${blog.author}`).parent()
          .should("not.contain", blog.url)
          .should("not.contain", blog.likes)
          .should("not.contain", user.name)
      })
      it("liking a blog works", function() {
        cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").as("theButton")
        cy.get("@theButton").click()
        cy.contains("view less")
  
        cy.contains(`"${blog.title}" by ${blog.author}`).parent()
          .contains(0)
          .contains(1).should("not.exist")
        
        cy.contains("like").click()

        cy.visit("http://localhost:3000")  //reload the page to make sure the like isn't just updated in the frontend
        
        cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").as("theButton")
        cy.get("@theButton").click()

        cy.contains(`"${blog.title}" by ${blog.author}`).parent()
          .contains(1)
          .contains(0).should("not.exist")
      })
      it("deleting a blog works when logged in", function() {
        cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").as("theButton")
        cy.get("@theButton").click()

        cy.contains("delete").click()

        cy.contains(`"${blog.title}" by ${blog.author}`).should("not.exist")
      })
      it("deleting a blog by another user isn't possible", function() {
        cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").as("theButton")
        cy.get("@theButton").click()

        cy.contains("log out").click()

        const otherUser = {
          name: "Nack Japier",
          username: "kojer",
          password: "huge secret"
        }
        
        cy.request("POST", "http://localhost:3003/api/users/", otherUser)
        cy.visit("http://localhost:3000")

        cy.get("#username").type(otherUser.username)
        cy.get("#password").type(otherUser.password)
        cy.get("#login-button").click()

        cy.contains(`"${blog.title}" by ${blog.author}`).parent().find("button").as("theButton")
        cy.get("@theButton").click()

        cy.contains("delete").find("button").should("not.exist")
      })
      it.only("blogs are sorted in descending order", function() {
        // 100 most common words in english
        const s = "a about all also and as at be because but by can come could day do even find first for from get give go have he her here him his how I if in into it its just know like look make man many me more my new no not now of on one only or other our out people say see she so some take tell than that the their them then there these they thing think this those time to two up use very want way we well what when which who will with would year you your"
        const l = s.split(" ").filter(i => i !== "")
        
        function randomWords(wordLen=3) {
          let ret = ""
          for (let i = 0; i < wordLen; i++) ret += l[Math.floor(l.length * Math.random())] + " "
          return ret
        }

        let blogtitles = []

        let token = JSON.parse(window.localStorage.getItem("user")).token

        if (!token.toLowerCase().startsWith("bearer ")) token = "bearer " + token

        const newBlogsAmt = 5

        // cy.wait(5000)

        for (let i = 0; i < newBlogsAmt; i++) {
          const randomBlog = {
            title: randomWords(),
            author: randomWords(),
            url: randomWords(),
            likes: Math.floor(10 * Math.random())
          }
          blogtitles.push(randomBlog.title)
          cy.request({
            method: "POST", 
            url: "http://localhost:3003/api/blogs/",
            headers: {
              Authorization: token,
            },
            body: randomBlog
          })
        }
        cy.wait(1000)
        cy.wait(1000)
        cy.wait(1000)
        cy.wait(1000)

        cy.reload() // reload the page to see the added blogs

        cy.wait(1000)
        
        // cy.visit("http://localhost:3000") // reload the page to see the added blogs

        // cy.wait(3000)
        
        cy.contains(`"${blog.title}" by ${blog.author}`).parent().parent().within(() => {
          cy.get("button").each(($btn) => {
            cy.wrap($btn).click()
          })
        })

        cy.contains(blogtitles[0]).parent().parent().children().should("have.length", newBlogsAmt + 1)
          .each( ($el) => {
            const text = $el.text()
            console.log(text)
          })


        // cy.wait(3000)
        
        // cy.visit("http://localhost:3000") // reload the page to see the added blogs


        // cy.wait(3000)
        
        // cy.visit("http://localhost:3000") // reload the page to see the added blogs
      })
    })
  })
})




