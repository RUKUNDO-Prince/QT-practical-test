import { db } from "../config/DBConnect.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const register = (req, res) => {
    // CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err,data) => {
        if (err) return res.json();
        if (data.length) return res.status(409).json("User Already Exists!");

        // HASH PASSWORD AND CREATE A USER
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword
        ];

        db.query(q, [values], (err,data) => {
            if (err) return res.json(err);
            return res.status(200).json("User created successfully!");
        });
    });
};

export const login = (req, res) => {
    // CHECK IF A USER EXISTS
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err,data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        // CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET);
        const { password, ...otherInfo } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(otherInfo);
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User logged out successfully!");
};