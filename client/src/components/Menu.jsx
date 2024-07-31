import React from 'react'
import { posts } from '../constants/data'

const Menu = () => {
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post => (
            <div key={post.id} className='post'>
                <img src={post.img} alt="Image" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu