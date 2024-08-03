import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  // FOR FORMATTING THE TEXT FROM THE TEXT EDITOR USED TO CREATE THE BLOG
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  // THE SHOW-MORE FUNCTIONALITY
  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  return (
    <div className="home">
      <div className="posts">
        {/* TO DISPLAY THE POSTS */}
        {posts.slice(0, visiblePosts).map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`./uploads/${post.img}`} alt="img" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p className="blog-content">{getText(post.content)}</p>
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* SHOW MORE POSTS */}
      {visiblePosts < posts.length && (
        <button onClick={handleShowMore} className="show-more">
          Show More
        </button>
      )}
    </div>
  );
};

export default Home;
