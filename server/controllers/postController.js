import { db } from "../config/DBConnect.js";
import jwt from 'jsonwebtoken'

export const getPosts = (req, res) => {
    const q = req.query.category ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";
    db.query(q,[req.query.category], (err,data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};

export const getPost = (req, res) => {
    const q = "SELECT `username`, `title`, `content`, p.img, u.img as userImg, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data) return res.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {};

export const deletePost = (req, res) => {
    // CHECK IF THERE'S A TOKEN
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    // CHECK IF TOKEN IS VALID
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");
        
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You are not allowed to delete this post!");
            
            return res.status(200).json("Post successfully deleted!");
        });
    });
};

export const updatePost = (req, res) => {};