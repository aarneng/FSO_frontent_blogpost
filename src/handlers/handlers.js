import blogService from "../services/blogs"


export async function handleLike(blog) {
  const res = await blogService.like(blog)
  console.log(res)
}

export async function handleDelete(blog) {
  await blogService.deleteBlog(blog)
  // setBlogs(blogs.filter(i => i.id !== blog.id))
}
