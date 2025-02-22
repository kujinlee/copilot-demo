const express = require('express');
const TodoController = require('../controllers/todoController');
const Todo = require('../models/todoModel'); // Corrected import path

const router = express.Router();
const todoController = new TodoController(Todo); // Pass the Todo model to the controller

router.post('/', todoController.createTodo.bind(todoController)); // bind to ensure correct `this` context
router.get('/', todoController.getTodos.bind(todoController)); // bind to ensure correct `this` context
router.put('/:id', todoController.updateTodo.bind(todoController)); // bind to ensure correct `this` context
router.delete('/:id', todoController.deleteTodo.bind(todoController)); // bind to ensure correct `this` context

module.exports = router;