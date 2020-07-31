import React from 'react'
import PropTypes from 'prop-types'

const SearchCity = ({ submit, value, change }) => {
    return (
        <>
            <form className="form"  onSubmit={submit}>
                <input type="text" value={value} placeholder="Enter city" onChange={change} />
            </form>
        </>
    );
};

SearchCity.propTypes = {
    submit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
};

export default SearchCity;