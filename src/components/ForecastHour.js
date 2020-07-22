import React from 'react'


const ForecastHour = props => {
    const { temp, month, day,icon } = props;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

    return (
        <div className="forecast-day">
            <div > {month}.{day}</div>
            <img src={iconUrl} />
            <span> {temp}&#176;</span>
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
