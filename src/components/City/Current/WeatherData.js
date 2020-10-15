import React from 'react'
import { DegreesToDirection, Month, Weekday, Day } from '../../../helpers/utils'
import PropTypes from 'prop-types'

export const WeatherData = ({ data, degree, isCelsius }) => {
    const {
        name, country, tempC, tempF,
        description, icon, tempMinC,
        tempMinF, tempMaxC,
        tempMaxF, feelsLikeC,
        feelsLikeF, speed, deg, humidity } = data;

    const imgSrc = "http://openweathermap.org/img/wn/"

    return (
        <>
            <header className="header">
                <h5>{Weekday}, {Month}, {Day}</h5>
            </header>
            <main>
                <div className="weather-main">
                    <img
                        src={`${imgSrc}${icon}@2x.png`} alt="weather icon"
                        className='weather-icon' />
                    <div>
                        <h2>{name}, {country}</h2>
                        <h3 className="description">{description}</h3>
                    </div>
                </div>
                <div className="temp-main">
                    <h5>Feels like {isCelsius ? `${feelsLikeC} °C` : `${feelsLikeF} °F`}</h5>
                    <h1 className="temperature">{isCelsius ? `${tempC} °C` : `${tempF} °F`}</h1>
                    <button className="btn-degree" onClick={degree}>
                        <ion-icon name="sync-outline" />
                        <h3>{isCelsius ? '°F' : `°C`}</h3>
                    </button>
                    <div className="hi-lo">
                        <h5>H {isCelsius ? `${tempMaxC} °C` : `${tempMaxF} °F`}°</h5>
                        <h5>L {isCelsius ? `${tempMinC} °C` : `${tempMinF} °F`}°</h5>
                    </div>
                </div>
            </main>
            <footer>
                <div className="weather-prop">
                    <img src={require('../../../assets/images/wind.png')} alt='wind' />
                    <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
                </div>
                <div className="weather-prop">
                    <img src={require('../../../assets/images/water.png')} alt='water' />
                    <h4>{humidity} %</h4>
                </div>
            </footer>
        </>
    );
}

WeatherData.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        country: PropTypes.string,
        tempC: PropTypes.number,
        tempF: PropTypes.number,
        description: PropTypes.string,
        icon: PropTypes.string,
        temp_min_C: PropTypes.string,
        temp_min_F: PropTypes.string,
        temp_max_C: PropTypes.string,
        temp_max_F: PropTypes.string,
        feels_like_C: PropTypes.string,
        feels_like_F: PropTypes.string,
        speed: PropTypes.number,
        deg: PropTypes.number,
        humidity: PropTypes.number,
    }).isRequired
}