import React, { useState } from 'react'
import ForecastHour from './ForecastHour';
import PropTypes from 'prop-types'

const Result = ({ weather, isCelsius }) => {
    const [open, setOpen] = useState(true)

    const {
        city,
        country,
        date,
        description,
        temp,
        tempF,
        sunset,
        sunrise,
        humidity,
        highestTemp,
        lowestTemp,
        forecast,
    } = weather;

    const forecasts = forecast.map(item => (
        <ForecastHour
            key={item.dt}
            temp={Math.floor(item.main.temp * 1) / 1}
            tempF={Math.floor((item.main.temp * 9 / 5) + 32)}
            icon={item.weather[0].icon}
            month={item.dt_txt.slice(5, 7)}
            day={item.dt_txt.slice(8, 10)}
            hour={item.dt_txt.slice(11, 13) * 1}
            isCelsius={isCelsius}
        />
    ));

    return (
        <div className="forecast">
            <div className="forecast-header">
                <div className="forecast-city">
                    <h3>{city}, {country} </h3>
                    <h5>{date}</h5>
                </div>
                <div className="forecast-temp">
                    <div>
                        <h2>{isCelsius ? `${Math.floor(temp)} °C` : `${Math.floor(tempF)} °F`}</h2>
                        <span>{description}</span>
                    </div>
                </div>
            </div>
            <div className="forecast-result">
                <div>
                    <div>{Math.floor(highestTemp)}&#176;</div>
                    <div>Hight</div>
                </div>
                <div>
                    <div>{Math.floor(lowestTemp)}&#176;</div>
                    <div>Low</div>
                </div>
                <div>
                    <div>{sunrise}</div>
                    <div >Sunrise</div>
                </div>

                <div>
                    <div>{humidity}%</div>
                    <div>Rain</div>
                </div>
                <div>
                    <div>{sunset}</div>
                    <div>Sunset</div>
                </div>
            </div>
            <button
                className={open === false ? "active" : "default"}
                onClick={() => setOpen(!open)} >
                <ion-icon name={open ? "arrow-down-outline" : "arrow-up-outline"} />
                <h3 className="forecat-name">Forecast</h3>
            </button>
            <div className={open ? 'show' : ""} title="forecast">
                <div className="forecast-card-result">{forecasts}</div>
            </div>
        </div >
    );
};

Result.propTypes = {
    weather: PropTypes.shape({
        city: PropTypes.string,
        country: PropTypes.string,
        date: PropTypes.string,
        description: PropTypes.string,
        main: PropTypes.string,
        temp: PropTypes.number,
        sunrise: PropTypes.string,
        sunset: PropTypes.string,
        humidity: PropTypes.number,
        wind: PropTypes.number,
        highestTemp: PropTypes.number,
        lowestTemp: PropTypes.number,
        forecast: PropTypes.array,
    }).isRequired,
};

export default Result;