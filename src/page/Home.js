import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import Header from '../component/Header'
import TodoList from '../component/TodoList'
import Footer from '../component/Footer';
import Modal from '../component/Modal';

// Utilities
import {
    isNotCheckedAll,
    convertToJSONFormat,
    filterByStatus
} from '../utilities/Home';

// SCSS
import '../scss/Todo.scss'

function Home() {
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todolist')) ?? [])
    const [todoEditingId, setTodoEditingId] = useState(null)
    const [todoRemovingId, setTodoRemovingId] = useState(null)
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [status, setStatus] = useState('ALL')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setIsCheckedAll(!isNotCheckedAll(todoList))
    }, [todoList])

    // Add
    const addTodo = (todo) => {
        setTodoList(prevState => [...prevState, todo])
        localStorage.setItem('todolist', convertToJSONFormat([...todoList, todo]))
    }

    // Edit
    const getTodoEditingId = (id) => {
        setTodoEditingId(id)
    }

    const onEditTodo = (todo, index) => {
        if (index !== -1) {
            const list = [...todoList]
            list.splice(index, 1, todo)
            setTodoList(list)
            setTodoEditingId(null)
            localStorage.setItem('todolist', convertToJSONFormat(list))
        }
    }

    const checkCompleted = (id) => {
        const checkIsCompleted = (array) => {
            return array.map(arrayItem => arrayItem.id === id ? ({ ...arrayItem, isCompleted: !arrayItem.isCompleted }) : arrayItem)
        }

        setTodoList(prevState => checkIsCompleted(prevState))
        setIsCheckedAll(!isNotCheckedAll(todoList))
        localStorage.setItem('todolist', convertToJSONFormat(checkIsCompleted([...todoList])))
    }

    const checkAllTodos = () => {
        const checkAllIsCompleted = (array) => {
            return array.map(arrayItem => ({ ...arrayItem, isCompleted: !isCheckedAll }))
        }

        setTodoList(prevState => checkAllIsCompleted(prevState))
        setIsCheckedAll(!isCheckedAll)
        localStorage.setItem('todolist', convertToJSONFormat(checkAllIsCompleted([...todoList])))
    }

    const statusFilter = (status) => {
        setStatus(status)
    }

    const clearCompleted = () => {
        const result = filterByStatus(todoList, 'ACTIVE')
        setTodoList(result)
        setShowModal(false)
        localStorage.setItem('todolist', convertToJSONFormat(result))
    }

    // Delete
    const getTodoRemovingId = (id) => {
        setTodoRemovingId(id)
    }

    const removeTodo = (id) => {
        const result = filterByStatus(todoList, 'REMOVE', id)
        setTodoList(result)
        setTodoRemovingId(null)
        setShowModal(false)
        localStorage.setItem('todolist', convertToJSONFormat(result))
    }

    return (
        <Router>
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
                        getTodoRemovingId={getTodoRemovingId}
                        onEditTodo={onEditTodo}
                        checkCompleted={checkCompleted}
                        isCheckedAll={isCheckedAll}
                        setShowModal={setShowModal}
                    />
                    <Footer
                        statusFilter={statusFilter}
                        status={status}
                        clearCompleted={clearCompleted}
                        numOfTodos={todoList.length}
                        numOfTodosLeft={filterByStatus(todoList, 'ACTIVE').length}
                        setShowModal={setShowModal}
                    />
                </div>

                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    todoRemovingId={todoRemovingId}
                    setTodoRemovingId={setTodoRemovingId}
                    removeTodo={removeTodo}
                    clearCompleted={clearCompleted}
                    todoList={todoList}
                />
            </div>
        </Router>
    );
}

export default Home;
