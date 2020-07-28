import React from 'react'


const SearchCity = ({ submit, value, change, showResult }) => {
    return (
        <>
            <form className="form" onSubmit={showResult} onSubmit={submit}>
                <input type="text" value={value} placeholder="Enter city" onChange={change} />
            </form>
        </>
    );
};

// SearchCity.propTypes = {
//     submit: PropTypes.func.isRequired,
//     value: PropTypes.string.isRequired,
//     change: PropTypes.func.isRequired,
//     showResult: PropTypes.bool.isRequired,
// };

export default SearchCity;