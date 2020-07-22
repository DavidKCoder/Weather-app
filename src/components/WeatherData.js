import React from 'react'
import { DegreesToDirection, Month, Weekday, Day } from '../helpers/utils'


export const WeatherData = ({ data, isLoaded, degree }) => {
    const { name, country, tempC, tempF, description, icon, temp_min_C, temp_min_F, temp_max_C, temp_max_F, feels_like_C, feels_like_F, speed, deg, humidity } = data;

    return (
        <>
            <header className="header">
                <h5>{Weekday}, {Month}, {Day} </h5>
            </header>
            <main>
                <div className='weather-main'>
                    <img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'
                        className='weather-icon' />
                    <div>
                        <h2>{name}, {country}</h2>
                        <h3 className='description'>{description}</h3>
                    </div>
                </div>
                <div className='temp-main'>
                    <h5>Feels like {isLoaded ? `${feels_like_C} °C` : `${feels_like_F} °F`}</h5>
                    <h1 className='temperature'>{isLoaded ? `${tempC} °C` : `${tempF} °F`}</h1>
                    <button className="btn-degree" onClick={degree}><ion-icon name="sync-outline"></ion-icon> <h3>{isLoaded ? '°F' : `°C`}</h3> </button>
                    <div className='hi-lo'>
                        <h5>H {isLoaded ? `${temp_max_C} °C` : `${temp_max_F} °F`}°</h5>
                        <h5>L {isLoaded ? `${temp_min_C} °C` : `${temp_min_F} °F`}°</h5>
                    </div>
                </div>
            </main>
            <footer>
                <div className='weather-prop'>
                    <img src={require('../images/wind.png')} alt='' />
                    <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
                </div>
                <div className='weather-prop'>
                    <img src={require('../images/water.png')} alt='' />
                    <h4>{humidity} %</h4>
                </div>
            </footer>
        </>
    );
}