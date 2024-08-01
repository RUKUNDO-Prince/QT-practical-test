import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [category, setCategory] = useState(state?.category || "");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/api/posts/${state.id}`, {
            title,
            content: value,
            category,
            img: file ? imgUrl : "",
          })
        : await axios.post("/api/posts", {
            title,
            content: value,
            category,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:MM:SS"),
          });
          navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload image
          </label>
          <div className="buttons">
            <button>Save as Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={category === "arts"}
              name="category"
              value="arts"
              id="arts"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="arts">Arts</label>
          </div>
          <div className="category">
            <input
              type="radio"
              checked={category === "science"}
              name="category"
              value="science"
              id="science"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="category">
            <input
              type="radio"
              checked={category === "technology"}
              name="category"
              value="technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="category">
            <input
              type="radio"
              checked={category === "cinema"}
              name="category"
              value="cinema"
              id="cinema"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="category">
            <input
              type="radio"
              checked={category === "design"}
              name="category"
              value="design"
              id="design"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="category">
            <input
              type="radio"
              checked={category === "food"}
              name="category"
              value="food"
              id="food"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
