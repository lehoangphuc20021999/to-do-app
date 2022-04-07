import React from 'react';
import PropTypes from 'prop-types';

const FilterBtn = props => {
    const {
        title,
        onClick,
        link,
        isActived
    } = props

    return (
        <li>
            <a
                href={`#/${link}`}
                className={`${isActived ? 'selected' : ''}`}
                onClick={onClick}
            >
                {title}
            </a>
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