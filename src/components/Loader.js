import React from 'react'

const Loader = props => {
    return (
        <div className="loader">
            <img src="https://thumbs.gfycat.com/SardonicFaintAsiandamselfly-small.gif" alt="loader" />
            <h4>{props.msg}</h4>
        </div>
    )
}

export default Loader;