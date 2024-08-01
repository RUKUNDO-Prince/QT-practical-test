import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// import { posts } from '../constants/data';
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [category]);

  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="img" />
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
              <p>{post.content}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home