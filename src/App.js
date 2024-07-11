import { useEffect, useState } from 'react';
import './App.css';
import ClearIcon from "./assets/clear.png"
import CloudIcon from "./assets/cloud.png"
import DrizzleIcon from "./assets/Drizzle.png"
import HumidityIcon from "./assets/humidity.png"
import RainIcon from "./assets/Rain.png"
import SearchIcon from "./assets/search.png"
import SnowIcon from "./assets/snow.png"
import WindIcon from "./assets/wind.png"

const WeatherDetails = ({ icon, temp, location, country, lat, lang, humidity, wind }) => {
  return (
    <>
      <div className="Image">
        <img src={icon} alt="Cloud" />
      </div>
      <div className="temp">{temp} °C</div>
      <div className="city">{location}</div>
      <div className="Country">{country}</div>
      <div className="cord">
        <div>
          <span className='Lat'>Latitude </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='Lang'>Latitude </span>
          <span>{lang}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={HumidityIcon} alt="humidity" className='Icon' />
          <div className="data">
            <div className="percentage">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={WindIcon} alt="wing" className='Icon' />
          <div className="data">
            <div className="percentage">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  let api_key = "aa98ad6193dff867d7cc9d7789e2f175";
  const [text, setText] = useState("elumalai")
  
  const [Icon, SetIcon] = useState(RainIcon);
  const [Temp, SetTemp] = useState(0);
  const [Location, SetLocation] = useState("");
  const [Country, SetCountry] = useState("");
  const [Lat, setLat] = useState(0)
  const [Lang, setLang] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWing] = useState(0)

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap ={
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": ClearIcon,
    "02n": ClearIcon,
    "03d": DrizzleIcon,
    "03n": DrizzleIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "010d": RainIcon,
    "010n": RainIcon,
    "013d": SnowIcon,
    "013n": SnowIcon,
  }

  const search = async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWing(data.wind.speed);
      SetTemp(Math.floor(data.main.temp));
      SetLocation(data.name)
      SetCountry(data.sys.country)
      setLat(data.coord.lat)
      setLang(data.coord.lon)
      const weatherIconCode = data.weather[0].icon;
      SetIcon(weatherIconMap[weatherIconCode] || ClearIcon);
      setCityNotFound(false);
    }
    catch (error) {
      setError("An error occurred while fetching data")
    }
    finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value)
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(function (){
    search();
  },[]);


  return (
    <>
      <div className="Container">
        <div className="Input-container">
          <input type="text" className='CityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className="search-icon">
            <img src={SearchIcon} alt="search-icon" className='icon' onClick={() => search()} />
          </div>
        </div>
        {!loading && !cityNotFound && <WeatherDetails icon={Icon} temp={Temp} location={Location} country={Country} lat={Lat} lang={Lang} wind={wind} humidity={humidity} />}
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}
        <div className="design">Designed By Hari</div>
      </div>
    </>
  );
}

export default App;
