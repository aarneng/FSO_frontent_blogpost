import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

test("only renders title and author", () => {
  const user = {
    name: "user",
    username: "name",
    id: 0xf397582469836ac354567
  }
  const blog = {
    title: "testing blog",
    author: "testing man",
    url: "testing.com",
    likes: 0,
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  let element = component.getByText(
    `"${blog.title}" by ${blog.author}`
  )
  expect(element).toBeDefined()

  element = component.queryByText(`${blog.url}`, { exact: false })
  expect(element).toBeNull()

  element = component.queryByText(`${blog.likes}`, { exact: false })
  expect(element).toBeNull()

  element = component.queryByText(`${user.name}`, { exact: false })
  expect(element).toBeNull()

})

test("renders everything once button has been clicked", () => {
  const user = {
    name: "user",
    username: "name",
    id: 0xf397582469836ac354567
  }
  const blog = {
    title: "testing blog",
    author: "testing man",
    url: "testing.com",
    likes: 0,
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  let button = component.getByText("view")
  fireEvent.click(button)

  // -------

  let element = component.getByText(
    `"${blog.title}" by ${blog.author}`, { exact: false }
  )
  expect(element).toBeDefined()

  element = component.getByText(`${blog.likes}`, { exact: false })
  expect(element).toBeDefined()

  element = component.getByText(`${blog.url}`, { exact: false })
  expect(element).toBeDefined()

  element = component.getByText(`${user.name}`, { exact: false })
  expect(element).toBeDefined()

})


test("clicking the like button twice calls event handler twice", async () => {
  const user = {
    name: "user",
    username: "name",
    id: 0xf397582469836ac354567
  }
  const blog = {
    title: "testing blog",
    author: "testing man",
    url: "testing.com",
    user: user
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler} handleDelete={mockHandler} />
  )

  let button = component.getByText("view")
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(0)

  button = component.getByText("like")
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  button = component.getByText("delete blog")
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)


})
