import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const FilterBtn = props => {
    const {
        title,
        onClick,
        link,
        isActived
    } = props

    return (
        <li>
            <Link
                to={`#/${link}`}
                className={`${isActived ? 'selected' : ''}`}
                onClick={onClick}
            >
                {title}
            </Link>
        </li>
    )
}

FilterBtn.defaultProps = {
    title: '',
    link: '',
    isActived: false,
    onClick: () => { }
}

FilterBtn.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    isActived: PropTypes.bool,
    onClick: PropTypes.func
}

export default FilterBtn;