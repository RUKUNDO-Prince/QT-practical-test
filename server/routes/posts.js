import express from 'express'
import { addPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController.js';

const router = express.Router();

// POST ROUTES
router.get("/", getPosts);
router.post("/", addPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;