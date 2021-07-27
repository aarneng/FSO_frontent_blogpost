import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./blogform"

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const handleSubmit = jest.fn()

  const component = render(
    <BlogForm handleSubmit={handleSubmit} />
  )

  const titleInput  = component.container.querySelector("#title")
  const authorInput = component.container.querySelector("#author")
  const urlInput    = component.container.querySelector("#url")
  const form = component.container.querySelector("form")

  fireEvent.change(titleInput, {
    target: { value: "test title" }
  })
  fireEvent.submit(form)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  console.log(handleSubmit.mock.calls);
  expect(handleSubmit.mock.calls[0][0].content).toBe("test title" )

})


