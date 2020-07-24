import React from 'react'


const ForecastHour = props => {
    const { temp, tempF, month, day, icon, isLoaded } = props;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

    return (
        <div className="forecast-day">
            <div > {month}.{day}</div>
            <img src={iconUrl} />
            <span> {isLoaded ? `${Math.floor(temp)} °C` : `${Math.floor(tempF)} °F`}</span>
        </div>
    );
};

// ForecastHour.propTypes = {
//     temp: PropTypes.number.isRequired,
//     month: PropTypes.string.isRequired,
//     day: PropTypes.string.isRequired,
//     hour: PropTypes.number.isRequired,
//     icon: PropTypes.string.isRequired,
// };

export default ForecastHour;
