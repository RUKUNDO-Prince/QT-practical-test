import React, { useEffect, useState } from 'react'
// import { posts } from '../constants/data'
import axios from "axios"
import { Link } from 'react-router-dom';

const Menu = ({ category }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/?category=${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [category]);

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post => (
            <div key={post.id} className='post'>
                <img src={`../uploads/${post.img}`} alt="Image" />
                <h2>{post.title}</h2>
                <Link to={`/post/${post.id}`}><button>Read More</button></Link>
            </div>
        ))}
    </div>
  )
}

export default Menu