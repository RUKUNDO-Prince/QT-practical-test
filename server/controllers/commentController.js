import { db } from "../config/DBConnect.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

// GET ALL COMMENTS FOR A SPECIFIC POST
export const getComments = (req, res) => {
    const q = "SELECT c.id, c.content, c.date, u.username, u.img as userImg FROM comments c JOIN users u ON c.uid = u.id WHERE c.postId = ?";
    db.query(q, [req.params.postId], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};

// ADD A NEW COMMENT TO A POST
export const addComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "INSERT INTO comments(`content`, `date`, `postId`, `uid`) VALUES (?)";

        const values = [
            req.body.content,
            req.body.date,
            req.body.postId,
            userInfo.id
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment successfully added!");
        });
    });
};

// DELETE A COMMENT
export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const commentId = req.params.id;
        const q = "DELETE FROM comments WHERE `id` = ? AND `uid` = ?";
        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You are not allowed to delete this comment!");
            return res.status(200).json("Comment successfully deleted!");
        });
    });
};

// UPDADTE A COMMENT
export const updateComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const commentId = req.params.id;
        const q = "UPDATE comments SET `content`=? WHERE `id` = ? AND `uid` = ?";

        const values = [req.body.content];
        db.query(q, [...values, commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment successfully updated!");
        });
    });
};
