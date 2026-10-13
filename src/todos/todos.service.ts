type Todo = {
  id: number
  title: string
  completed: boolean
}

export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn TypeScript', completed: false },
    { id: 2, title: 'Build a REST API', completed: false },
    { id: 3, title: 'Deploy the application', completed: false },
  ]

  getTodos() {
    return this.todos
  }

  createTodo(todo: Omit<Todo, 'id'>) {
    const newTodo = { ...todo, id: Date.now() }
    this.todos.push(newTodo)
    return newTodo
  }

  updateTodo(index: number, updatedTodo: Partial<Omit<Todo, 'id'>>) {
    if (index < 0 || index >= this.todos.length) {
      throw new Error('Todo not found')
    }
    this.todos[index] = { ...this.todos[index], ...updatedTodo }

    return this.todos[index]
  }

  deleteTodo(index: number) {
    if (index < 0 || index >= this.todos.length) {
      throw new Error('Todo not found')
    }
    return this.todos.splice(index, 1)[0]
  }
}
