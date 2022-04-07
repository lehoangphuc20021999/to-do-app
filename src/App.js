import React, { useEffect, useState } from 'react';

// Components
import Header from './component/Header'
import TodoList from './component/TodoList'
import Footer from './component/Footer';

// SCSS
import './scss/Todo.scss'

const isNotCheckedAll = (todos) => todos.find(todo => !todo.isCompleted)
const filterByStatus = (todos, status, id) => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id)
    default:
      return todos
  }
}


function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: 'Todo 1',
      isCompleted: true
    },
    {
      id: 2,
      text: 'Todo 2',
      isCompleted: false
    }
  ])

  const [todoEditingId, setTodoEditingId] = useState(null)
  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const [status, setStatus] = useState('ALL')

  useEffect(() => {
    setIsCheckedAll(!isNotCheckedAll(todoList))
  }, [todoList])

  // Add
  const addTodo = (todo) => {
    setTodoList(prevState => [...prevState, todo])
  }

  // Edit
  const getTodoEditingId = (id) => {
    setTodoEditingId(id)
  }

  const onEditTodo = (todo, index) => {
    if (index >= 0) {
      const list = [...todoList]
      list.splice(index, 1, todo)
      setTodoList(list)
      setTodoEditingId(null)
    }
  }

  const markCompleted = (id) => {
    const list = [...todoList]
    const result = list.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo)
    setTodoList(result)
    setIsCheckedAll(!isNotCheckedAll(todoList))
  }

  const checkAllTodos = () => {
    const list = [...todoList]
    const result = list.map(todo => ({ ...todo, isCompleted: !isCheckedAll }))
    setTodoList(result)
    setIsCheckedAll(!isCheckedAll)
  }

  const statusFilter = (status) => {
    setStatus(status)
  }

  const clearCompleted = () => {
    setTodoList(filterByStatus(todoList, 'ACTIVE'))
  }

  const removeTodo = (id) => {
    setTodoList(filterByStatus(todoList, 'REMOVE', id))
  }

  return (
    <div className="wrapper" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.25) 300px, rgba(255,255,255,.4) 60px)" }}>
      <div className="to-do-app">
        <Header
          addTodo={addTodo}
          isCheckedAll={isCheckedAll}
          checkAllTodos={checkAllTodos}
        />
        <TodoList
          todoList={filterByStatus(todoList, status)}
          todoEditingId={todoEditingId}
          getTodoEditingId={getTodoEditingId}
          onEditTodo={onEditTodo}
          markCompleted={markCompleted}
          isCheckedAll={isCheckedAll}
          removeTodo={removeTodo}
        />
        <Footer
          statusFilter={statusFilter}
          status={status}
          clearCompleted={clearCompleted}
          numOfTodos={todoList.length}
          numOfTodosLeft={filterByStatus(todoList, 'ACTIVE').length}
        />
      </div>
    </div>
  );
}

export default App;
