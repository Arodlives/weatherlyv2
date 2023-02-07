import { useState, useEffect } from 'react';



export default function Home()
{
    const googleparam1 = process.env.googleapi;
    const openweatherparam1 = process.env.openweatherapikey;
    
    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        const { latitude, longitude } = position.coords;
        // do something with the latitude and longitude
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  async function getData() {
    const res1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleparam1}`);
    const data1 = await res1.json();
    const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherparam1}`);
    const data2 = await res2.json();
    return { data1, data2 };
  }
}