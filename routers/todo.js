const express = require('express');
const router = express.Router();
const {validateAuth} = require('../middlewares/auth/auth.middleware');
const todoController = require('../controllers/todoController');

router.post('/createTodo', validateAuth ,todoController.createTodo);
router.get('/getAllTodos/:userId', todoController.getAllTodos);
router.put('/deleteTodo/:id', validateAuth, todoController.deleteTodo);
router.get('/getTodo/:id', todoController.getTodo);
router.put('/updateTodo/:id', validateAuth, todoController.updateTodo);
module.exports = router;