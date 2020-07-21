import React, { Component } from 'react';
import './App.css';

import { WeatherData } from './components/WeatherData';
import { StatusData } from './components/StatusData';
import { Form } from './components/Form';
import { Weather } from './components/weather';

const REACT_APP_WEATHER_KEY = 'f4e155f7679750eb61e41084eef3aa33';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'init',
      isLoaded: false,
      weatherData: null,
      city: undefined,
      temp: undefined,
      icon: undefined
    }
  }

  //-- For abort fetch--\

  abortController = new AbortController();
  controllerSignal = this.abortController.signal;

  //---- return user coord.
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

  //FIXME ---- incomplite part ----
  gettingWeatherCity = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_WEATHER_KEY}&units=metric`
      );
      const res = await api_url.json()
      console.log(res);
      // const temp = res.main.temp

      this.setState({
        isLoaded: true,
        status: 'success',
        city: res.name,
        country: res.sys.country,
        description: res.weather[0].description,
        feels_like: res.main.feels_like,
        temp: Math.floor(res.main.temp),
        temp_F: Math.floor((res.main.temp * 9 / 5) + 32),
        temp_max_C: res.main.temp_max,
        temp_min_C: res.main.temp_min,
        temp_max_F: Math.floor((res.main.temp_max * 9 / 5) + 32).toFixed(1),
        temp_min_F: Math.floor((res.main.temp_min * 9 / 5) + 32).toFixed(1),
        icon: res.weather[0].icon,
        error: undefined
      })
    }
    else {
      this.setState({
        city: undefined,
        country: undefined,
        description: undefined,
        feels_like: undefined,
        temp: undefined,
        temp_F: undefined,
        icon: undefined,
        temp_max_C: undefined,
        temp_min_C: undefined,
        temp_max_F: undefined,
        temp_min_F: undefined,
        error: "Choose your city"
      })
    }
  };

  // use OpenWeather API with coord
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

  // --- Current Location receive location---
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

  weatherMethod = () => {
    return this.gettingWeatherCity()
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <h2>Weather App</h2>
          <Form weatherMethod={this.gettingWeatherCity} />
          {this.returnActiveView(this.state.status)}
        </div>
        {this.state.city !== undefined ? <div className="container-2" >
          <Weather
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            feels_like={this.state.feels_like}
            temp={this.state.temp}
            temp_F={this.state.temp_F}
            temp_max_C={this.state.temp_max_C}
            temp_min_C={this.state.temp_min_C}
            temp_max_F={this.state.temp_max_F}
            temp_min_F={this.state.temp_min_F}
            icon={this.state.icon}
            isLoaded={this.state.isLoaded}
            degree={this.degree}
          />
        </div> : ""}

      </div>
    );
  }
}

export default App;