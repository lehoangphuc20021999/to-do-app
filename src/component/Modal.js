import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

const Modal = (props) => {
    const {
        showModal,
        setShowModal,
        todoRemovingId,
        setTodoRemovingId,
        removeTodo,
        clearCompleted,
        todoList
    } = props
    const [todo, setTodo] = useState('')

    useEffect(() => {
        const result = todoList.find(todo => todo.id === todoRemovingId)
        setTodo(result)
    }, [todoList, todoRemovingId])

    const clearModal = () => {
        setShowModal(false)
        setTodoRemovingId(null)
    }

    return (
        <div className={showModal ? 'modal open' : 'modal'}>
            <div
                className={showModal ? 'modal__overlay open' : 'modal__overlay'}
                onClick={() => clearModal()}
            ></div>

            <div className={showModal ? 'modal__content open' : 'modal__content'}>
                <div className="modal__header d-flex align-items-center">
                    <h3 className="title">{todoRemovingId ? 'Delete Todo' : 'Clear All Completed Todos'}</h3>
                    <button
                        type="button" className="close"
                        onClick={() => clearModal()}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal__body">
                    <p>{todo ? `Are you sure you want to delete ${todo.text} ?` : 'Are you sure you want to clear all completed todos ?'}</p>
                </div>
                <div className="modal__footer d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => clearModal()}>Close</button>
                    {
                        todoRemovingId
                            ? <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => removeTodo(todoRemovingId)}>Delete</button>
                            : <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => clearCompleted()}>Clear</button>
                    }
                </div>
            </div>
        </div >
    );
};

Modal.defaultProps = {
    showModal: false,
    todoList: [],
    todoRemovingId: null,
    setShowModal: () => { },
    setTodoRemovingId: () => { },
    removeTodo: () => { },
    clearCompleted: () => { },
}

Modal.propTypes = {
    showModal: PropTypes.bool,
    todoList: PropTypes.array,
    todoRemovingId: PropTypes.number,
    setShowModal: PropTypes.func,
    setTodoRemovingId: PropTypes.func,
    removeTodo: PropTypes.func,
    clearCompleted: PropTypes.func
}

export default Modal;