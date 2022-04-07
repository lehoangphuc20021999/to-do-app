import React, { useState } from 'react';
import PropTypes from 'prop-types'

const Header = (props) => {
    const {
        title,
        addTodo,
        isCheckedAll,
        checkAllTodos
    } = props

    const [text, setText] = useState('')

    const onAddTodo = (e) => {
        if (e.key === 'Enter' && text) {
            addTodo({
                id: new Date().valueOf(),
                text,
                isCompleted: false
            })
            setText('')
        }
    }

    return (
        <>
            <h1>{title}</h1>
            <header className='header'>
                <input
                    className='toggle-all'
                    type='checkbox'
                    checked={isCheckedAll}
                    defaultChecked
                />
                <label
                    htmlFor='toggle-all'
                    onClick={checkAllTodos}
                ></label>
                <input
                    className='new-to-do'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={onAddTodo}
                    placeholder="Write something..."
                />
            </header>
        </>
    );
};

Header.defaultProps = {
    title: 'todoapp',
    isCheckedAll: false,
    addTodo: () => { },
    checkAllTodos: () => { }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    isCheckedAll: PropTypes.bool,
    addTodo: PropTypes.func,
    checkAllTodos: PropTypes.func
}

export default Header;