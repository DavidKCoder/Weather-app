import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "f4e155f7679750eb61e41084eef3aa33";

class App extends React.Component {

  state = {
    tempC: undefined,
    tempF: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
    isLoading: true,
  };

  gettingWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await api_url.json();

      const tempC = data.main.temp; // Temperature in celsius

      let sunset = data.sys.sunset;
      let date = new Date();

      date.setTime(sunset);
      let sunset_date =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      this.setState({
        tempC: Math.floor(data.main.temp),
        tempF: Math.floor((tempC * 9 / 5) + 32),
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        tempC: undefined,
        tempF: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Write name of city !"
      });
    }
  };

  degree = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                {/* {isLoading ? <Spiner /> : .... } */}
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  tempC={this.state.tempC}
                  tempF={this.state.tempF}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunset={this.state.sunset}
                  error={this.state.error}
                  degree={this.degree}
                  isLoading={this.state.isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
