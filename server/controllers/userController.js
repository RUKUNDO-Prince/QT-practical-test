import { db } from "../config/DBConnect.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Get user profile
export const getUserProfile = (req, res) => {
    // CHECK IF THERE'S A TOKEN
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    // CHECK IF TOKEN IS VALID
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        // IF EVERYTHING IS OK
        const q = "SELECT `id`, `username`, `email`, `img` FROM users WHERE `id` = ?";
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        });
    });
};

// Update user profile
export const updateUserProfile = (req, res) => {
    // CHECK IF THERE'S A TOKEN
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    // CHECK IF TOKEN IS VALID
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        // Hash the new password if provided
        const updatePassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        };

        const updateFields = async () => {
            const fields = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password ? await updatePassword(req.body.password) : undefined,
                img: req.body.img
            };

            // Remove undefined fields
            Object.keys(fields).forEach(key => fields[key] === undefined && delete fields[key]);

            return fields;
        };

        updateFields().then(fields => {
            const q = "UPDATE users SET ? WHERE `id` = ?";
            db.query(q, [fields, userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("User profile successfully updated!");
            });
        }).catch(err => res.status(500).json(err));
    });
};

// Delete user profile
export const deleteUserProfile = (req, res) => {
    // CHECK IF THERE'S A TOKEN
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    // CHECK IF TOKEN IS VALID
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        // IF EVERYTHING IS OK
        const q = "DELETE FROM users WHERE `id` = ?";
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User profile successfully deleted!");
        });
    });
};
