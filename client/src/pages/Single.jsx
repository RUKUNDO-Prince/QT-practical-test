import React, { useContext, useEffect, useState } from "react";
import { deleteIcon, edit } from "../assets/img";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "../components";
import axios from 'axios'
import { AuthContext } from "../context/authContext";
import moment from 'moment'

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [postId]);

  return (
    <div className="single">
      <div className="content">
        <img
          src={post?.img}
          alt=""
        />
        <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser === post.username && <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={edit} alt="Edit-Icon" />
            </Link>
            <img src={deleteIcon} alt="Delete-Icon" />
          </div>}
        </div>
        <h1>{post.title}</h1>
        {post.content}
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;
