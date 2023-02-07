import { useState, useEffect } from 'react';
import {Paper,TextInput,Button,Text,Group} from "@mantine/core"







export default function Home(){
    
    const googleparam1 = process.env.googleapi;
    const openweatherparam1 = process.env.openweatherapikey;
    
    const[locationPermission,setLocationPermission]=useState(null);

    
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
    
    //async function getData() {
    //    const res1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleparam1}`);
    //    const data1 = await res1.json();
    //    const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherparam1}`);
    //    const data2 = await res2.json();
    //    return { data1, data2 };
    //  }
    }
    const handleGeolocation = () => {
    if ("geolocation" in navigator) {
        //*🤨The in operator is used to check if an object has a specific property or method
        //* If geolocation is supported
        //The navigator object has several properties and methods that can be used to retrieve information about the browser and the user's device. Some of the most commonly used properties and methods of the navigator object include:
        //navigator.userAgent: a string that contains information about the browser and the user's device.
        //navigator.language: a string that contains the user's preferred language.
        //navigator.appName: a string that contains the name of the browser.
        //navigator.appVersion: a string that contains the version of the browser.
        //navigator.geolocation: an object that provides access to the browser's geolocation API.
        //navigator.getBattery(): a function that returns a promise that will resolve to a BatteryManager object providing information about the battery status of the device.
        //getweather();
        navigator.geolocation.getCurrentPosition(
            (position) => {
            setLocationPermission(position.permission);
            if (position.permission === "granted") {
            // do something with the position
            }
        },
        (error) => {
            // handle error
        }
    );
        return(
            <div>
      <button onClick={handleGeolocation}>Get Location</button>
      {locationPermission === "granted" && <p>Location access granted</p>}
      {locationPermission === "denied" && <p>Location access denied</p>}
      {locationPermission === "prompt" && <p>Prompt for location access</p>}
    </div>
    )
    } else {
        // geolocation is not supported
        // Show an input box for the user to enter location manually
        console.log("Geolocation is not supported by this browser.");
    }
    return(
        <div>
        <button onClick={handleGeolocation}>Get Location</button>
        {locationPermission === "granted" && <p>Location access granted</p>}
        {locationPermission === "denied" && <p>Location access denied</p>}
        {locationPermission === "prompt" && <p>Prompt for location access</p>}
      </div>
    )
    }
}