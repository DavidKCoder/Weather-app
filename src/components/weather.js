import React from 'react';

const Weather = props => (
    <div className="infoWeath">
        {props.city &&
            <div>
                <p>Location: {props.city}, {props.country}</p>
                <p>Temp: {props.isLoading ? `${props.tempC} C°` : `${props.tempF} F°`} <i class="fa fa-thermometer-three-quarters"></i></p>
                <p>Pressure: {props.pressure}</p>
                <p>Sunset: {props.sunset}</p>
                <button onClick={props.degree} className="btn btn-warning btn-sm degrees">{props.isLoading ? 'F°' : 'C°'}</button>
            </div>
        }
        <p className="error">{props.error} </p>
    </div>
);

export default Weather;