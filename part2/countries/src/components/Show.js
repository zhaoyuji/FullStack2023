
const ShowWeather = ({one_cty, weather}) => {
  const iconImg = `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`

  return (
    <div>
    <p><b>Weather in {one_cty?.capital[0]}</b></p>
    <p>temperature {Math.round((weather?.main?.temp-273.15) * 100) / 100} Celcius</p>
    <img src={iconImg} alt={one_cty?.capital[0]} width="50" height="50"></img>
    <p>wind {weather?.wind?.speed} m/s</p>
    </div>
  )
}

const ShowOneCountry = ({one_cty, weather}) => {
  return (
    <div>
    <h2>{one_cty?.name?.common}</h2>
    <p>capital {one_cty?.capital[0]}</p>
    <p>area {one_cty?.area}</p>
    <p><b>languages:</b></p>
    {Object.values(one_cty?.languages).map(x =>  <li key={x}> {x} </li> )}
    <p></p>
    <img src={one_cty?.flags?.png} alt={one_cty?.flags?.alt} width="150" height="100"></img>
    <ShowWeather one_cty={one_cty} weather={weather}/> 
    </div>
  )

}

const ShowCountry = ({newFilter, cur_cty, handleShow, weather}) => {
  if ((newFilter ==="") || (newFilter === null)){
    return (null)
  }
  if (cur_cty.length > 10){
    return (
      <div>
      Too many matches, specify another filter
      </div>
      )
  }
  if (cur_cty.length > 1){
    const names = cur_cty.map(x => {return x?.name?.common})
    names.sort()
    return (
      <div>
      {names.map(c => <p key={c}> {c} <button onClick={() => handleShow(cur_cty, c)}>show</button></p> )}
      </div>
    )
  }
  if (cur_cty.length === 1){
    return (
      <div>
      <ShowOneCountry one_cty={cur_cty[0]} weather={weather}/> 
      </div>
    )
  }
}


export default {ShowWeather, ShowOneCountry, ShowCountry}  
