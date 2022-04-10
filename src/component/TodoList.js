import React from 'react';
import PropTypes from 'prop-types'

// Components
import Todo from './Todo'

const TodoList = (props) => {
    const {
        todoList,
        todoEditingId,
        getTodoEditingId,
        getTodoRemovingId,
        onEditTodo,
        checkCompleted,
        checkAllTodos,
        setShowModal
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
                                    getTodoRemovingId={getTodoRemovingId}
                                    onEditTodo={onEditTodo}
                                    checkCompleted={checkCompleted}
                                    checkAllTodos={checkAllTodos}
                                    setShowModal={setShowModal}
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
    getTodoRemovingId: () => { },
    onEditTodo: () => { },
    checkCompleted: () => { },
    checkAllTodos: () => { },
    setShowModal: () => { }
}

TodoList.propTypes = {
    todoList: PropTypes.array,
    todoEditingId: PropTypes.number,
    getTodoEditingId: PropTypes.func,
    onEditTodo: PropTypes.func,
    checkCompleted: PropTypes.func,
    checkAllTodos: PropTypes.func,
    setShowModal: PropTypes.func,
}

export default TodoList;