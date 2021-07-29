import React from "react"
import { render, fireEvent, queryByAttribute } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./blogform"

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const handleSubmit = jest.fn()

  const getById = queryByAttribute.bind(null, "id")

  const component = render(
    <BlogForm handleSubmit={handleSubmit} />
  )

  // const titleInput  = component.container.querySelector("#title")
  const titleInput = getById(component.container, "title")
  const authorInput = getById(component.container, "author")
  const urlInput = getById(component.container, "url")
  // const authorInput = component.container.querySelector("#author")
  // const urlInput    = component.container.querySelector("#url")
  const form = component.container.querySelector("form")

  console.log(titleInput)
  console.log(form)

  fireEvent.change(titleInput, {
    target: { value: "test title" }
  })
  fireEvent.change(authorInput, {
    target: { value: "test author" }
  })
  fireEvent.change(urlInput, {
    target: { value: "test url" }
  })
  fireEvent.submit(form)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  // console.log(handleSubmit.mock.calls)
  expect(handleSubmit.mock.calls[0][0].title).toBe("test title")
  expect(handleSubmit.mock.calls[0][0].author).toBe("test author")
  expect(handleSubmit.mock.calls[0][0].url).toBe("test url")

})


