import express from 'express';
import {SignUp, getUser, login} from '../controllers/user.js';
const router = express.Router();

router.get('/finduser', getUser);
router.post('/signup', SignUp);
router.post('/login', login )

export default router