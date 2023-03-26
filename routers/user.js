const express = require('express');
const router = express.Router();
const {validateAuth} = require('../middlewares/auth/auth.middleware');
const userController = require('../controller/userController');

router.post('/signIn', userController.signIn);
router.post('/verifySignIn', userController.verifySignIn);
router.put('/updateUser', validateAuth, userController.updateUser);
router.get('/getUser', validateAuth, userController.getUser);
module.exports = router;