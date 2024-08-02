import express from 'express';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import commentRoutes from './routes/comments.js';
import userRoutes from './routes/users.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());
app.use(cookieParser());

// FOR IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOADS_DIR1);
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

// ROUTES
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', commentRoutes);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log('Connected!');
});
