import express from 'express'
import { addComment, deleteComment, getComments, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/comments/:postId', getComments);
router.post('/comments', addComment);
router.delete('/comments/:id', deleteComment);
router.put('/comments/:id', updateComment);

export default router;