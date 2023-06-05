import express from 'express';
import router from './user';
import { DeleteBlog, GetAllBlog, addBlog, getUserByID, getbyID, updateBlog } from '../controllers/blog';
router = express.Router();

router.get('/', GetAllBlog);
router.post('/addBlog', addBlog);
router.put('/upddate/:id', updateBlog);
router.get('/:getbyID', getbyID)
router.delete('/:id', DeleteBlog);
router.get('/users/:id', getUserByID)

export default router; 