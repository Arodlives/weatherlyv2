import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import {useRef,useEffect,useState} from 'react'
import {Getsearchterm} from '../components/Getsearchterm.jsx'

const inter = Inter({ subsets: ['latin'] })

export default function weatherly(){
  //?❤️
  function getcurrentlocation(){
    navigator.geolocation.getCurrentPosition(async function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const locationData = {latitude: latitude, longitude: longitude};
      
      const locationJson = JSON.stringify(locationData);
      console.log(locationJson);
    });
  }

  //?💛 {To take data from json object and return location data}
  function SearchForm() {
    const inputRef = useRef(null)
  
    useEffect(() => {
      async function submitForm() {
        // Focus on the input element
        inputRef.current.focus()
  
        // Get the search term
        const searchTerm = await Getsearchterm()
  
        // Set the value of the input element
        inputRef.current.value = searchTerm
  
        // Click the enter button
        inputRef.current.form.dispatchEvent(new Event('submit'))
      }
  
      submitForm()
    }, [])
  
    return (
      <form>
        <input ref={inputRef} type="text" />
      </form>
    )
  }
return (
  <div>
    {/* //? Title section */}
    <div>
      <h1>Weatherly</h1>
      <h3>elegant and fast</h3>
    </div>
    {/* //? Dark-Mode toggle section */}
    <div>

    </div>
    {/* //? Form Section */}
    <div>
      <h5>Search For Weather In Your Area Below⬇️🙂</h5>
      <SearchForm />
    </div>
    {/* //? Popular Searches Section */}
    <div>
      <p>Under Construction🛠️</p>
    </div>
    {/* //! If clicked search/enter section shows result */}



  </div>
)
}

