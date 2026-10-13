import express from 'express'

const app = express()

type Todo = {
  id: number
  title: string
  completed: boolean
}

let todos: Todo[] = [
  { id: 1, title: 'Learn TypeScript', completed: false },
  { id: 2, title: 'Build a REST API', completed: false },
  { id: 3, title: 'Deploy the application', completed: false }
]

app.use(express.json())

app.get('/todos', (req, res) => {
  res.json(todos)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
