import React from 'react'

export const Form = ({ weatherMethod }) => {
    return (
        <>
            <form onSubmit={weatherMethod} className="form">
                <input type="text" name="city" placeholder="Choose city..." />
                <button className="btn">Getting weather</button>
            </form>
        </>
    )

}