import {useState, useEffect} from 'react'
import axios from "axios";


const Weather = (props) => {
    const {country} = props
    const [weather, setWeather] = useState({main: {temp: 4}, weather: [{icon: '02d'}], wind: {speed: 3}})

    const api_key = process.env.REACT_APP_API_KEY


    const hook = () => {
        axios
            .get('https://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + api_key)
            .then(response => {
                console.log(response.data)
                setWeather(response.data)
            })
    }

    useEffect(hook, [])

    const image = 'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p>temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
            <img src={image} alt="weather icon"/>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather