import { db } from "../config/DBConnect.js";
import bcrypt from 'bcryptjs'

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

export const login = (req, res) => {}
export const logout = (req, res) => {}