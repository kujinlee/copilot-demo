const express = require('express');
const TodoController = require('../controllers/todoController');

const router = express.Router();
const todoController = new TodoController();

router.post('/todos', todoController.createTodo.bind(todoController));
router.get('/todos', todoController.getTodos.bind(todoController));
router.put('/todos/:id', todoController.updateTodo.bind(todoController));
router.delete('/todos/:id', todoController.deleteTodo.bind(todoController));

module.exports = router;