import express from 'express';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path"; // Import the path module

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
    console.log("Connected!");
});
