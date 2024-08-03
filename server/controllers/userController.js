import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from "../config/DBConnect.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// GET CURRENT FILE PATH AND FILENAME
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMAGE UPLOADS
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, process.env.UPLOADS_DIR2));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// GET USER PROFILE
export const getUserProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "SELECT id, username, email, img FROM users WHERE id = $1";
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data.rows[0]);
        });
    });
};

// UPDATE USER PROFILE
export const updateUserProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        upload.single('img')(req, res, async (uploadErr) => {
            if (uploadErr) return res.status(500).json(uploadErr);

            const updatePassword = async (password) => {
                const salt = await bcrypt.genSalt(10);
                return await bcrypt.hash(password, salt);
            };

            const updateFields = async () => {
                const fields = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password ? await updatePassword(req.body.password) : undefined,
                    img: req.file ? `/uploads/usersProfile/${req.file.filename}` : undefined
                };

                Object.keys(fields).forEach(key => fields[key] === undefined && delete fields[key]);

                return fields;
            };

            updateFields().then(fields => {
                const q = `UPDATE users SET 
                            ${Object.keys(fields).map((key, index) => `${key} = $${index + 1}`).join(", ")} 
                            WHERE id = $${Object.keys(fields).length + 1}`;

                const values = [...Object.values(fields), userInfo.id];

                db.query(q, values, (err, data) => {
                    if (err) return res.status(500).json(err);

                    // FETCH THE UPDATED USER PROFILE
                    const selectQ = "SELECT id, username, email, img FROM users WHERE id = $1";
                    db.query(selectQ, [userInfo.id], (err, updatedData) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json(updatedData.rows[0]);
                    });
                });
            }).catch(err => res.status(500).json(err));
        });
    });
};

// DELETE USER PROFILE
export const deleteUserProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "DELETE FROM users WHERE id = $1";
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User profile successfully deleted!");
        });
    });
};
