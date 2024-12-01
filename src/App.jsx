import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [sName, setsName] = useState("")
  const [name, setname] = useState("Mumbai")
  const [today, settoday] = useState("")
  const [forecast, setForecast] = useState()
  const [location, setlocation] = useState("")
  const [current, setcurrent] = useState("")

  useEffect(() => {
    getData()
  }, [name])

  const getData = async () => {
    let a = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8d02cfb3ec3343bbb5c111651242607&q=${name}&days=10&aqi=no&alerts=no`);
    let b = await a.json()
    setForecast(b.forecast.forecastday)
    settoday(b.forecast.forecastday[0])
    setlocation(b.location)
    setcurrent(b.current)
  }

  const handleSubmit = (e) => {
    setname(sName)
  }
  const handleChange = (e) => {
    setsName(e.target.value)
  }


  return (
    <>
      <Navbar />
      <div className='bg-[#C3DDFD] py-4'>
        <div className='container p-4 lg:w-1/2 rounded-xl mx-auto  min-h-[85vh] text-center bg-[#76A9FA] ' >
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input onChange={handleChange} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="  Enter City Name..." required />
              <button onClick={handleSubmit} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 my-4 p-2 py-4 rounded-lg bg-[#99c0ff] ' >
            <h2>
              {location ? location.name : ""},{location ? location.country : ""}
            </h2>
            <img className='w-20' src={current ? current.condition.icon : ""} alt="" />
            <p className='text-5xl font-bold' >{current ? current.temp_c : ""}<sup>&deg;</sup>C</p>
            <p>feels likes <span className='font-bold' >{current ? current.feelslike_c : ""}<sup>&deg;</sup>C</span></p>
            <p>{current ? current.condition.text : ""}</p>
            <div className='flex justify-evenly w-[80%] md:w-[60%] lg:w-[50%]' >
              <div className='flex items-center justify-center gap-2' >
                <span className="material-symbols-outlined">
                  airwave
                </span>
                <p>{current ? current.wind_kph : ""}kmph</p>

              </div>
              <div className='flex items-center justify-center' >
                <span className="material-symbols-outlined">
                  humidity_high
                </span>
                <p>{current ? current.humidity : ""}</p>
              </div>
              <div className='flex items-center justify-center gap-2' >
                <p>{current ? current.pressure_mb : ""}mbar</p>
              </div>
            </div>
            <div className='flex items-center w-[80%] justify-evenly '>
              <div className='flex flex-col items-center'>
                <img width={50} src="/sunrise.png" alt="" />
                {today ? today.astro.sunrise : ""}
                <p>sunrise</p>
              </div>
              <div className='flex flex-col items-center'>
                <img width={50} src="/sunset.png" alt="" />
                {today ? today.astro.sunset : ""}
                <p>sunset</p>
              </div>
            </div>
            <div>
              as per {current ? current.last_updated : ""}
            </div>
          </div>

          <h2 className='text-3xl m-3'>Forecast by Hours</h2>
          <div className='overflow-auto w-full flex  gap-1 items-center max-sm:text-sm justify-evenly'>
            {today ? today.hour.map((e, i) => {
              return <div key={i} className="text-sm rounded-lg p-2 min-w-60 bg-[#99c0ff] flex flex-col gap-1 items-center justify-center ">
                <p>{e.time}</p>
                <div className='flex items-center justify-evenly w-full '>
                  <img src={e.condition.icon} alt="" />
                  <div>
                    <p className='text-lg font-bold'>{e.temp_c}<sup>&deg;</sup>C</p>
                    <p>feel like {e.feelslike_c}<sup>&deg;</sup>C</p>
                  </div>
                </div>
              </div>
            }) : ""}
          </div>

          <div>
            <h2 className='text-3xl m-3'>Forecast by Days</h2>
            <div className='flex flex-col gap-2' >
              {forecast ? forecast.map((e) => {
                return <div className='flex items-center max-sm:text-sm rounded-lg justify-evenly p-2 w-full bg-[#99c0ff] ' key={e.date} >
                  <img className='w-8' src={e.day.condition.icon} alt="" />
                  <p>{e.day.avgtemp_c}<sup>&deg;</sup>C</p>
                  <p>{e.day.condition.text}</p>
                  <p>{e.date}</p>
                </div>
              }) : ""}
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}

export default App
