import React from 'react';
import PropTypes from 'prop-types'

// Components
import Todo from './Todo'

const TodoList = (props) => {
    const {
        todoList,
        todoEditingId,
        getTodoEditingId,
        onEditTodo,
        markCompleted,
        checkAllTodos,
        removeTodo
    } = props

    return (
        <section className='main'>
            {
                todoList.length > 0 ?
                    <ul className='to-do-list'>
                        {
                            todoList.map((todo, index) => (
                                <Todo
                                    key={todo.id} todo={todo}
                                    index={index}
                                    todoEditingId={todoEditingId}
                                    getTodoEditingId={getTodoEditingId}
                                    onEditTodo={onEditTodo}
                                    markCompleted={markCompleted}
                                    checkAllTodos={checkAllTodos}
                                    removeTodo={removeTodo}
                                />
                            ))
                        }
                    </ul> :
                    <h3 className='nothing text-center'>Empty</h3>
            }
        </section>
    );
};

TodoList.defaultProps = {
    todoList: [],
    todoEditingId: null,
    getTodoEditingId: () => { },
    onEditTodo: () => { },
    markCompleted: () => { },
    checkAllTodos: () => { },
    removeTodo: () => { }
}

TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    todoEditingId: PropTypes.number,
    getTodoEditingId: PropTypes.func,
    onEditTodo: PropTypes.func,
    markCompleted: PropTypes.func,
    checkAllTodos: PropTypes.func,
    removeTodo: PropTypes.func
}

export default TodoList;