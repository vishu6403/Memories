import express from 'express';

import { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router(); //setup router

import auth from "../middleware/auth.js";


//can be seen using localhost:5000/posts and not "localhost:5000/"
//auth is used to specify that a user can create, edit, delete his posts only
// auth in the like posts is used to specify that a user can like a post only once
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;