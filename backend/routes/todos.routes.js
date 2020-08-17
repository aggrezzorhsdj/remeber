const express = require('express');
const todosRouter = express.Router();
const todosController = require('../controller/todos.controller');

todosRouter.route('/')
    .get(todosController.index)
    .post(todosController.add)

todosRouter.route('/:id')
    .get(todosController.view)
    .put(todosController.update)
    .delete(todosController.delete)

module.exports = todosRouter;
