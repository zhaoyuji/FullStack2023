import { useState, useEffect } from 'react'
import getData from './services/getData'
import Show from './components/Show'

const Filter = ({newFilter, handleFilterChange}) => 
  <form>
  <div>
    find countries<input
          value={newFilter}
          onChange={handleFilterChange}
          />
  </div>
  </form>

const App = () => {
  const [all_countries, setAllCountries] = useState([])
  const [cur_countries, setCurCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState()
  const hook = () => {
    getData.getAll()
      .then(all_countries => {
        setAllCountries(all_countries)
        setCurCountries(all_countries)
      })
  }
  useEffect(hook, [])

  const hookWeather = () => {
    if (cur_countries.length > 0){
      const capLat = cur_countries[0].capitalInfo?.latlng[0]
      const capLon = cur_countries[0].capitalInfo?.latlng[1]
      getData.getWeather(capLat, capLon)
        .then(weather => setWeather(weather))
    }
  } 
  useEffect(hookWeather, [cur_countries])
  
  const handleShow = (cur_cty, c) => {
    const one_cty = cur_cty.filter(x => x?.name?.common===c)
    setCurCountries(one_cty)
  }

  const handleFilterChange = (event) => {
    const curFilter = event.target.value
    setNewFilter(curFilter)
    setCurCountries(all_countries.filter(c => c?.name?.common.toLowerCase().includes(curFilter.toLowerCase())))
  }
  
  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Show.ShowCountry newFilter={newFilter} cur_cty={cur_countries} handleShow={handleShow} weather={weather}/> 
    </div>
  )
}   

export default App
