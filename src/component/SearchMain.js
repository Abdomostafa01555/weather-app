import React , {useEffect,useState}from 'react'
import  '../component/style.css'
import WeatherDetails from './WeatherDetails';

function SearchMain() {
  
  const [searchTerm , setSearchTerm] = useState ('Cairo');
  const [tempInfo , setTempInfo] =useState({});
  // console.log(searchTerm);

  const getWeatherInfo = async () => {
    try{
      let url = `  https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=bbdf13c9427f8dafebc29a0a58e1b48a`

      let res = await fetch (url);
      let data = await res.json();
      const {temp ,humidity, pressure} = data.main ;
      const {main: weatherType} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country , sunset} = data.sys;
      const myNewWeatherInfo = {
        temp ,humidity, pressure, weatherType, name , speed, country , sunset, 
      }
      setTempInfo(myNewWeatherInfo);

      // console.log(data);
    } catch(error){
      // console.log(error);
    }
  };

  useEffect(()=>{
    getWeatherInfo()
  }, []);

  return (
    <>
    <div className='wrap'>
         <div className='search'>
            <input type="search" 
                   placeholder='City Name .. ' 
                   id='search'
                   value={searchTerm} 
                   onChange={(e) => setSearchTerm(e.target.value)}/>
         <button className='searchButton' onClick={getWeatherInfo}>
            Search 
         </button>
         </div>
    </div>
    {/* this is the weather details page */}
    <WeatherDetails {...tempInfo}/>
    </>
  )
}

export default SearchMain;
