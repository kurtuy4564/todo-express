import express from 'express'
import todosRouter from './todos/todos.controller.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/todos', todosRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`)
})
