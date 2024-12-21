
import React, { useState } from 'react';
import styles from './weather.module.css'; // Adjust the import to use the CSS module
import drizzle from './assets/weather3.jpg';
import rain from './assets/weather2.jpg';
import snow from './assets/weather1.jpg';
import clearsky from './assets/weather5.jpg';
import searchIcon from './assets/search.jpg';
import cloud from './assets/weather4.jpg';
import logo from './assets/logo.jpg';

const Details = ({ ticon, temp, city, country, lat, long, pressure, humidity, visibility, wind, descr }) => {
  const iconimg = {
    "01d": clearsky,
    "01n": clearsky,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const icon = iconimg[ticon] || cloud;

  return (
    <div className={styles.weatherDetailsContainer}>
      <div className={styles.iconContainer}>
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className={styles.weatherDetails}>
        <div className={styles.detailItem}><span>Temperature: </span><span>{temp} °C</span></div>
        <div className={styles.detailItem}><span>Description: </span><span>{descr}</span></div>
        <div className={styles.detailItem}><span>City: </span><span>{city}, {country}</span></div>
        <div className={styles.detailItem}><span>Latitude: </span><span>{lat}</span></div>
        <div className={styles.detailItem}><span>Longitude: </span><span>{long}</span></div>
        <div className={styles.detailItem}><span>Pressure: </span><span>{pressure} hPa</span></div>
        <div className={styles.detailItem}><span>Humidity: </span><span>{humidity}%</span></div>
        <div className={styles.detailItem}><span>Visibility: </span><span>{visibility} m</span></div>
        <div className={styles.detailItem}><span>Wind Speed: </span><span>{wind} m/s</span></div>
      </div>
    </div>
  );
};

function Weather() {
  const [text, setText] = useState('');
  const [city, setCity] = useState('Chennai');
  const [country, setCountry] = useState('IN');
  const [descr, setDescr] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [temp, setTemp] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [wind, setWind] = useState(0);
  const [ticon, setIcon] = useState('');
  const [notfound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchTemp = async () => {
    setLoading(true);
    const apiKey = 'f3a1d8c8141b9c65ee36b9bac07a07e1';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === "404") {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setCity(data.name);
      setCountry(data.sys.country);
      setDescr(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setLat(Math.round(data.coord.lat));
      setLong(Math.round(data.coord.lon));
      setTemp(data.main.temp);
      setHumidity(data.main.humidity);
      setPressure(data.main.pressure);
      setVisibility(data.visibility);
      setWind(data.wind.speed);
      setNotFound(false);
    } catch (err) {
      console.log("Error:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchTemp();
    }
  };

  return (
    <>
      <header>
        <p><img src={logo} alt="Logo" /></p>
        <h1>AGROW</h1>
      </header>
      <div className={styles.weatherContainer}>
        <div className={styles.wcontainer}>
          <h2>Weather App</h2>
          <div className={styles.searchCity}>
            <input
              type="text"
              placeholder="Enter City name"
              onChange={handleCityChange}
              onKeyDown={handleKeyPress}
              value={text}
            />
            <img src={searchIcon} alt="Search" onClick={searchTemp} />
          </div>
          <div className={styles.weather}>
            {loading ? (
              <div>Loading...</div>
            ) : notfound ? (
              <div>City not found</div>
            ) : (
              <Details
                ticon={ticon}
                temp={temp}
                city={city}
                country={country}
                lat={lat}
                long={long}
                pressure={pressure}
                humidity={humidity}
                visibility={visibility}
                wind={wind}
                descr={descr}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
