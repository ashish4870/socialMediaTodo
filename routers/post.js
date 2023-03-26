const express = require('express');
const router = express.Router();
const {validateAuth} = require('../middlewares/auth/auth.middleware');
const postController = require('../controllers/postController');

router.post('/createPost', validateAuth ,postController.createPost);
router.get('/getAllPosts/:userId', postController.getAllPosts);
router.put('/deletePost/:id', validateAuth, postController.deletePost);
router.get('/getPost/:id', postController.getPost);
router.get('/getPost/:id/comments', postController.getComments);
router.put('/getPost/:id/addComment', postController.addComment);
router.put('/updatePost/:id', validateAuth, postController.updatePost);
module.exports = router;