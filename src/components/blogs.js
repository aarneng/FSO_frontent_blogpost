import React from "react"
import Blog from "./Blog"

import { useSelector, useDispatch } from 'react-redux'

const Blogs = ({ user, handleLike, handleDelete }) => {
  const blogs = useSelector((state) => {
      return state.blogs  
    }
  )
  const dispatch = useDispatch()

  return blogs.map(blog =>
    <div key={blog.id}>
      <Blog
        blog={blog}
        user={user}
        handleLike={handleLike} 
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default Blogs
