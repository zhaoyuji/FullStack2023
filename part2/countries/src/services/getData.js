import axios from 'axios'
const countryURL = 'https://restcountries.com/v3.1/all'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?'

const getAll = () => {
  // console.log("getAll")
  const request = axios.get(countryURL)
  return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
  // console.log("getWeather")
  const api_key = process.env.REACT_APP_API_KEY
  const request = axios.get(weatherURL+`lat=${lat}&lon=${lon}&appid=${api_key}`)
  return request.then(response => response.data)
}

export default {getAll, getWeather}  
