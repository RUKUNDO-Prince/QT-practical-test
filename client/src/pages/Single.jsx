import React, { useContext, useEffect, useState } from "react";
import { deleteIcon, edit } from "../assets/img";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import moment from 'moment';
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  // Fetch post and comments data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(`/api/posts/${postId}`);
        setPost(postRes.data);

        const commentsRes = await axios.get(`/api/comments/${postId}`);
        setComments(commentsRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // Handle deleting a blog post
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Handle adding a comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/comments`, {
        content: newComment,
        date: new Date(),
        postId: postId,
      });
      setNewComment("");
      const commentsRes = await axios.get(`/api/comments/${postId}`);
      setComments(commentsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle editing a comment
  const handleCommentEdit = async (commentId) => {
    try {
      await axios.put(`/api/comments/${commentId}`, {
        content: editingCommentContent,
      });
      setEditingCommentId(null);
      setEditingCommentContent("");
      const commentsRes = await axios.get(`/api/comments/${postId}`);
      setComments(commentsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle deleting a comment
  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      const commentsRes = await axios.get(`/api/comments/${postId}`);
      setComments(commentsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Extract plain text from HTML
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../uploads/${post?.img}`} alt="" />
        <div className="user">
          {post?.userImg && <img src={post?.userImg} alt="" />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && (
            <div className="edit">
              <Link to={`/write?edit`} state={post}>
                <img src={edit} alt="Edit-Icon" />
              </Link>
              <img onClick={handleDelete} src={deleteIcon} alt="Delete-Icon" />
            </div>
          )}
        </div>
        <div className="post-content">
          <h1>{post.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          ></p>
        </div>
        {/* COMMENTS SECTION */}
        <div className="comments">
          <h3>Comments</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="user-info">
                  <span>{comment.username}</span>
                  <p>{moment(comment.date).fromNow()}</p>
              </div>
              {editingCommentId === comment.id ? (
                <form
                  className="edit-comment"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentEdit(comment.id);
                  }}
                >
                  <textarea
                    value={editingCommentContent}
                    onChange={(e) => setEditingCommentContent(e.target.value)}
                  />
                  <div>
                    <button type="submit">Update</button>
                    <button
                      type="button"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <p>{comment.content}</p>
              )}
              {(currentUser?.username === post?.username ||
                currentUser?.username === comment.username) && (
                <div className="buttons">
                  <button
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditingCommentContent(comment.content);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleCommentDelete(comment.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          {currentUser && (
            <form className="add-comment" onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Comment</button>
            </form>
          )}
        </div>
      </div>
      <div className="menu">
        <Menu category={post?.category} currentPostId={post?.id} />
      </div>
    </div>
  );
};

export default Single;
