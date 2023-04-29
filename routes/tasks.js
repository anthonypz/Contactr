const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, tasksController.getTodos)

router.post('/createTodo', tasksController.createTodo)

router.put('/markComplete', tasksController.markComplete)

router.put('/markIncomplete', tasksController.markIncomplete)

router.delete('/deleteTodo', tasksController.deleteTodo)

module.exports = router