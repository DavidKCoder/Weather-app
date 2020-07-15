import React from 'react';

const Form = (props) => (
    <div>
        <form onSubmit={props.weatherMethod}>
            <input type="text" name="city" placeholder="Choose city..." />
            <button className="btn btn-warning">Getting weather</button>
        </form>
    </div>

)

export default Form;