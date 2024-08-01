import { db } from "../config/DBConnect.js";

export const getPosts = (req, res) => {
    const q = req.query.category ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";
    db.query(q,[req.query.category], (err,data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });
};

export const getPost = (req, res) => {
    const q = "SELECT `username`, `title`, `content`, p.img, u.img as userImg, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        if (data) return res.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {};

export const deletePost = (req, res) => {};

export const updatePost = (req, res) => {};