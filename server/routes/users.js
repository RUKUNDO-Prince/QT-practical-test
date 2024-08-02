import express from 'express';
import { deleteUserProfile, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:id', getUserProfile);
router.put('/:id', verifyToken, updateUserProfile);
router.delete('/:id', verifyToken, deleteUserProfile);

export default router;
