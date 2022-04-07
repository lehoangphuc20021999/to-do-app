import React from 'react';
import PropTypes from 'prop-types'

// Components
import FilterBtn from './FilterBtn';

const Footer = (props) => {
    const {
        status,
        statusFilter,
        clearCompleted,
        numOfTodos,
        numOfTodosLeft
    } = props

    const filterBtns = [{
        title: 'All',
        isActived: status === 'ALL',
        link: '',
        onClick: () => statusFilter('ALL')
    }, {
        title: 'Active',
        isActived: status === 'ACTIVE',
        link: 'active',
        onClick: () => statusFilter('ACTIVE')
    }, {
        title: 'Completed',
        isActived: status === 'COMPLETED',
        link: 'completed',
        onClick: () => statusFilter('COMPLETED')
    }]

    return (
        <footer className='footer'>
            <span className='to-do-count'>
                <strong>{numOfTodosLeft} </strong>
                <span>{numOfTodosLeft <= 1 ? 'item' : 'items'}</span>
                <span> left</span>
            </span>
            <ul className='footer__filters'>
                {
                    filterBtns.map(btn => (
                        <FilterBtn
                            key={btn.title}
                            {...btn}
                        />
                    ))
                }
            </ul>
            {numOfTodos > numOfTodosLeft && <button className='footer__clear--completed' onClick={clearCompleted}>Clear completed</button>}
        </footer>
    );
};

Footer.defaultProps = {
    status: '',
    statusFilter: () => { },
    clearCompleted: () => { },
    numOfTodos: null,
    numOfTodosLeft: null
}

Footer.propTypes = {
    status: PropTypes.string.isRequired,
    statusFilter: PropTypes.func,
    clearCompleted: PropTypes.func,
    numOfTodos: PropTypes.number,
    numOfTodosLeft: PropTypes.number
}

export default Footer;