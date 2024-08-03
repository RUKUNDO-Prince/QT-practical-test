import express from 'express'
import { addComment, deleteComment, getComments, updateComment } from '../controllers/commentController.js';

const router = express.Router();

// COMMENTSROUTES
router.get('/:postId', getComments);
router.post('/', addComment);
router.delete('/:id', deleteComment);
router.put('/:id', updateComment);

export default router;