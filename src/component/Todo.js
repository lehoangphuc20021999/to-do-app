import React, { useState } from 'react';
import PropTypes from 'prop-types'

const Todo = (props) => {
    const {
        todo,
        index,
        todoEditingId,
        getTodoEditingId,
        onEditTodo,
        markCompleted,
        removeTodo
    } = props

    const [text, setText] = useState(todo.text)
    const isEditing = todoEditingId === todo.id

    const editTodo = () => {
        onEditTodo({
            ...todo,
            text
        }, index)
    }

    return (
        <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
            {
                !isEditing ?
                    <div className='view'>
                        <input
                            className='toggle'
                            type='checkbox'
                            checked={todo.isCompleted}
                            onChange={() => markCompleted(todo.id)}
                        />
                        <label onDoubleClick={() => getTodoEditingId(todo.id)}>{todo.text}</label>
                        <button className='destroy' onClick={() => removeTodo(todo.id)}></button>
                    </div> :
                    <input
                        className='edit'
                        type='text'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onBlur={editTodo}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                editTodo()
                            }
                        }}
                    />
            }

        </li>
    );
};

Todo.defaultProps = {
    todo: {},
    index: null,
    todoEditingId: null,
    getTodoEditingId: () => { },
    onEditTodo: () => { },
    markCompleted: () => { },
    removeTodo: () => { }
}

Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    todoEditingId: PropTypes.number,
    getTodoEditingId: PropTypes.func,
    onEditTodo: PropTypes.func,
    markCompleted: PropTypes.func,
    removeTodo: PropTypes.func
}

export default Todo;