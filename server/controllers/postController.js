import { db } from "../config/DBConnect.js";

export const getPosts = (req, res) => {
    const q = req.query.category ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";
    db.query(q,[req.query.category], (err,data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });
};

export const getPost = (req, res) => {};
export const addPost = (req, res) => {};
export const deletePost = (req, res) => {};
export const updatePost = (req, res) => {};