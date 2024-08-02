import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from "../config/DBConnect.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, process.env.UPLOADS_DIR2));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get user profile
export const getUserProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "SELECT `id`, `username`, `email`, `img` FROM users WHERE `id` = ?";
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        });
    });
};

// Update user profile
export const updateUserProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
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
                const q = "UPDATE users SET ? WHERE `id` = ?";
                db.query(q, [fields, userInfo.id], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("User profile successfully updated!");
                });
            }).catch(err => res.status(500).json(err));
        });
    });
};

// Delete user profile
export const deleteUserProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "DELETE FROM users WHERE `id` = ?";
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User profile successfully deleted!");
        });
    });
};
