import { db } from "../config/DBConnect.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getPosts = (req, res) => {
    const category = req.query.category;
    const q = category
        ? `SELECT * FROM posts WHERE category = $1`
        : `SELECT * FROM posts`;

    const queryParams = category ? [category] : [];

    db.query(q, queryParams, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data.rows);
    });
};


export const getPost = (req, res) => {
    const q = `SELECT p.id, u.username, p.title, p.content, p.img, u.img as userImg, p.category, p.date 
               FROM users u 
               JOIN posts p ON u.id = p.uid 
               WHERE p.id = $1`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.rows.length > 0) return res.status(200).json(data.rows[0]);
        return res.status(404).json("Post not found!");
    });
};


export const addPost = (req, res) => {
    // CHECK IF THERE'S A TOKEN
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    // CHECK IF TOKEN IS VALID
    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        // IF EVERYTHING IS OK
        const q = `INSERT INTO posts(title, content, img, category, date, uid) 
                   VALUES ($1, $2, $3, $4, $5, $6)`;

        const values = [
            req.body.title,
            req.body.content,
            req.body.img,
            req.body.category,
            req.body.date,
            userInfo.id
        ];
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post successfully created!");
        });
    });
};

export const deletePost = (req, res) => {
    // CHECK IF THERE'S A TOKEN
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    // CHECK IF TOKEN IS VALID
    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");
        
        // IF EVERYTHING IS OK
        const postId = req.params.id;
        const q = `DELETE FROM posts WHERE id = $1 AND uid = $2`;
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You are not allowed to delete this post!");
            
            return res.status(200).json("Post successfully deleted!");
        });
    });
};

export const updatePost = (req, res) => {
    // CHECK IF THERE'S A TOKEN
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    // CHECK IF TOKEN IS VALID
    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        // IF EVERYTHING IS OK
        const postId = req.params.id;
        const q = `UPDATE posts 
                   SET title = $1, content = $2, img = $3, category = $4 
                   WHERE id = $5 AND uid = $6`;

        const values = [
            req.body.title,
            req.body.content,
            req.body.img,
            req.body.category,
        ];
        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post successfully updated!");
        });
    });
};
