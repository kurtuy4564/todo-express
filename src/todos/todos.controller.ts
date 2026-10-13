import { Router } from 'express'
import { TodosService } from './todos.service.js'

const todosRouter = Router()

const todosService = new TodosService()

todosRouter.get('/', (req, res) => {
  const { id } = req.query

  if (id === undefined) {
    return res.status(200).json(todosService.getTodos())
  }

  const todoId = Number(id)

  if (!Number.isInteger(todoId) || todoId <= 0) {
    return res.status(400).json({ message: 'Invalid todo ID' })
  }

  const todo = todosService.getTodos().find(t => t.id === todoId)

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  return res.status(200).json(todo)
})

todosRouter.put('/', (req, res) => {
  const todoId = Number(req.query.id)
  if (!Number.isInteger(todoId) || todoId <= 0) {
    return res.status(400).json({ message: 'Invalid todo ID' })
  }

  const todoIndex = todosService.getTodos().findIndex(t => t.id === todoId)
  const updatedTodo = todosService.updateTodo(todoIndex, req.body)
  return res.status(200).json(updatedTodo)
})

todosRouter.post('/', (req, res) => {
  if (req.body.title === undefined) {
    return res.status(400).json({ message: 'Title is required' })
  }

  const newTodo = todosService.createTodo(req.body)
  res.status(201).json(newTodo)
})

todosRouter.delete('/', (req, res) => {
  const todoId = Number(req.query.id)
  if (!Number.isInteger(todoId) || todoId <= 0) {
    return res.status(400).json({ message: 'Invalid todo ID' })
  }

  const todoIndex = todosService.getTodos().findIndex(t => t.id === todoId)
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  const deletedTodo = todosService.deleteTodo(todoIndex)
  return res.status(200).json(deletedTodo)
})

export default todosRouter
