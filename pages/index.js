import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { get } from 'http';
import {useRef,useEffect,useState} from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function weatherly(){

  // async function getLocationData(req,res){
  //   const response = await fetch('/api/Location',options);
  //   const data = await response.json();
  //   return data;
  // }
  
  // getLocationData().then(locationData => {
  //   // Use the location data here
  // });



return (
  <div>
    {/* //? Title section */}
    <div>
      <h1>Weatherly</h1>
      <h3></h3>
    </div>
    {/* //? Form Section */}
    <div>
      <h5>Search For Weather In Your Area Below⬇️🙂</h5>
      <form>
        {/* <input ref={inputRef} type="text"/> */}
        <input type="text"/>
      </form>
    </div>
    {/* //? Popular Searches Section */}
    <div>
      <p>Under Construction🛠️</p>
    </div>
    {/* //! If clicked search/enter section shows result */}



  </div>
)
}
