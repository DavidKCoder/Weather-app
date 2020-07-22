import React, { Component } from 'react';
import './App.css';

import { WeatherData } from './components/WeatherData';
import { StatusData } from './components/StatusData';
// import { Weather } from './components/weather';


import Loader from './components/Loader';
import SearchCity from './components/SearchCity';
import Result from './components/Result';
import NotFound from './components/NotFound';


const REACT_APP_WEATHER_KEY = 'f4e155f7679750eb61e41084eef3aa33';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'init',
      isLoaded: false,
      isLoader: false,
      weatherData: null,
      city: undefined,
      temp: [],
      icon: undefined,

      value: '',
      weatherInfo: null,
      error: false
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


  // use OpenWeather API with coord -------------------------------------
  getWeatherData = (lat, lon) => {

    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${REACT_APP_WEATHER_KEY}`;

    fetch(weatherApi, { signal: this.controllerSignal })
      .then(response => response.json())
      .then(
        (result) => {
          // console.log(result);

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
              temp_max_C: temp_max.toFixed(2),
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
  //----------------------------------------------------
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
        return <WeatherData
          data={this.state.weatherData}
          isLoaded={this.state.isLoaded}
          degree={this.degree} />;
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
    this.setState({
      isLoaded: true
    })
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

  // ------------------------------------------------
  componentDidMount() {
    this.setState({
      isLoader: true
    })
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearchCity = e => {
    e.preventDefault();
    const { value } = this.state;
    const APIkey = REACT_APP_WEATHER_KEY;

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ];

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
          }`;
        const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 4);
        const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 4);

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list.filter(reading => reading.dt_txt.includes("18:00:00")),
        };
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };



  render() {
    if (!this.state.isLoader) {
      return <Loader msg={'Loading'} />
    }
    
    const { value, weatherInfo, error } = this.state;

    return (
      <div className='App'>
        <div className='container'>
          <h2>Weather App</h2>
          {this.returnActiveView(this.state.status)}
        </div>
        {this.state.status !== "init" ? <div className="container-3">
          <div showLabel={(weatherInfo || error) && true}>Weather app</div>
          <div>
            <SearchCity
              value={value}
              showResult={(weatherInfo || error) && true}
              change={this.handleInputChange}
              submit={this.handleSearchCity}
            />
            <div>
              {weatherInfo && <Result weather={weatherInfo} />}
            </div>
            {error && <NotFound error={error} />}
          </div>
        </div> : ""}

      </div>
    );
  }
}

export default App;