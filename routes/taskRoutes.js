const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, taskController.getTodos)

router.post('/createTodo', taskController.createTodo)

router.put('/markComplete', taskController.markComplete)

router.put('/markIncomplete', taskController.markIncomplete)

router.delete('/deleteTodo', taskController.deleteTodo)

module.exports = router