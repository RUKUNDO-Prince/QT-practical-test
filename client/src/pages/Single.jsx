import React, { useContext, useEffect, useState } from "react";
import { deleteIcon, edit } from "../assets/img";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../components";
import axios from 'axios'
import { AuthContext } from "../context/authContext";
import moment from 'moment'
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});

  const navigate = useNavigate();
  
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

  const handleDelete = async() => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img
          src={`../uploads/${post?.img}`}
          alt=""
        />
        <div className="user">
          {post?.userImg && <img
            src={post?.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && <div className="edit">
            <Link to={`/write?edit`} state={post}>
              <img src={edit} alt="Edit-Icon" />
            </Link>
            <img onClick={handleDelete} src={deleteIcon} alt="Delete-Icon" />
          </div>}
        </div>
        <div className="post-content">
          <h1>{post.title}</h1>
          <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p> 
        </div>
      </div>
      <div className="menu">
        <Menu category={post?.category} />
      </div>
    </div>
  );
};

export default Single;
