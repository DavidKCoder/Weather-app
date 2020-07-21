import React from 'react';

export const Weather = (props) => {
    return (
        <>
            {props.city &&
                <>
                    <main>
                        <div className='weather-main'>
                            <img
                                src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt='weather icon'
                                className='weather-icon' />
                            <div>
                                <h2>{props.city}, {props.country}</h2>
                                <h5 className="description">{props.description}</h5>
                            </div>
                        </div>
                        <div className='temp-main-2'>
                            <h5>Feels like {props.isLoaded ? `${props.feels_like} °C` : `${props.feels_like_F} °F`} °</h5>
                            <h3 className='temperature-city'>{props.isLoaded ? `${props.temp} °C` : `${props.temp_F} °F`}</h3>
                            {/* <button className="btn-degree" onClick={props.degree}><ion-icon name="sync-outline"></ion-icon> <h3>{props.isLoaded ? '°F' : `°C`}</h3> </button> */}
                            <div className='hi-lo'>
                                <h5>H {props.isLoaded ? `${props.temp_max_C} °C` : `${props.temp_max_F} °F`}°</h5>
                                <h5>L {props.isLoaded ? `${props.temp_min_C} °C` : `${props.temp_min_F} °F`}°</h5>
                            </div>
                        </div>
                    </main>
                </>
            }
        </>
    )

}