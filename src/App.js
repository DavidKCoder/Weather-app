import React, { Component } from 'react';
import './App.css';

import { WeatherData } from './components/WeatherData';
import { StatusData } from './components/StatusData';
import { Form } from './components/Form';

const REACT_APP_WEATHER_KEY = 'f4e155f7679750eb61e41084eef3aa33';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'init',
      isLoaded: false,
      weatherData: null
    }
  }

  abortController = new AbortController();
  controllerSignal = this.abortController.signal;

  weatherInit = () => {
    const success = (position) => {
      this.setState({ status: 'fetching' });
      localStorage.setItem('location-allowed', true);
      this.getWeatherData(position.coords.latitude, position.coords.longitude);
    }
    const error = () => {
      this.setState({ status: 'unable' });
      localStorage.removeItem('location-allowed');
      alert('Unable to retrieve location.');
    }
    if (navigator.geolocation) {
      this.setState({ status: 'fetching' });
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      this.setState({ status: 'unsupported' });
      alert('Your browser does not support location tracking, or permission is denied.');
    }
  }

  gettingWeatherCity = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_WEATHER_KEY}&units=metric`
      );
      fetch(api_url, { signal: this.controllerSignal })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const { city } = result
        })

    }
  };

  getWeatherData = (lat, lon) => {

    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${REACT_APP_WEATHER_KEY}`;

    fetch(weatherApi, { signal: this.controllerSignal })
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result);

          const { name } = result;
          const { country } = result.sys;
          const { temp, temp_min, temp_max, feels_like, humidity } = result.main;
          const { description, icon } = result.weather[0];
          const { speed, deg } = result.wind

          this.setState({
            isLoaded: true,
            status: 'success',
            weatherData: {
              name,
              country,
              description,
              icon,
              tempC: Math.floor(temp.toFixed(1)),
              tempF: Math.floor((temp * 9 / 5) + 32),
              feels_like_C: feels_like.toFixed(1),
              feels_like_F: Math.floor((feels_like * 9 / 5) + 32).toFixed(1),
              temp_min_C: temp_min.toFixed(1),
              temp_min_F: Math.floor((temp_min * 9 / 5) + 32).toFixed(1),
              temp_max_C: temp_max.toFixed(1),
              temp_max_F: Math.floor((temp_max * 9 / 5) + 32).toFixed(1),
              speed,
              deg,
              humidity
            }
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  //! --- Current Location ---
  returnActiveView = (status) => {
    switch (status) {
      case 'init':
        return (
          <button
            className='btn-main'
            onClick={this.onClick}
          >
            Get My Location
            <ion-icon name="navigate-outline"></ion-icon>
          </button>
        );
      case 'success':
        return <WeatherData data={this.state.weatherData} isLoaded={this.state.isLoaded} degree={this.degree} />;
      default:
        return <StatusData status={status} />;
    }
  }

  onClick = () => {
    this.weatherInit();
  }

  componentDidMount() {
    if (localStorage.getItem('location-allowed')) {
      this.weatherInit();
    } else {
      return;
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  // ---- change °C to °F ----
  degree = () => {
    this.setState({
      isLoaded: !this.state.isLoaded,
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <h2>Weather App</h2>
          <Form weatherMethod={this} />
          {this.returnActiveView(this.state.status)}
        </div>
      </div>
    );
  }
}

export default App;