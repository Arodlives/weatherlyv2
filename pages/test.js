import { useState, useEffect } from 'react';
import {Paper,TextInput,Button,Text,Group} from "@mantine/core"

export default function Home(){
    
    const googleparam1 = process.env.googleapi;
    const openweatherparam1 = process.env.openweatherapikey;
    
    const[locationPermission,setLocationPermission]=useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState(null);
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getData();
        }
    }, [latitude, longitude]);

    async function getData() {
        try {
            const res1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleparam1}`);
            const data1 = await res1.json();
            if(data1.results && data1.results[0] && data1.results[0].address_components) {
                setCity(data1.results[0].address_components[0].long_name);
                const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherparam1}`);
                const data2 = await res2.json();
                console.log({ data1, data2 });
            } else {
                console.log('Invalid data returned from the Google Maps API');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleGeolocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationPermission(position.permission);
                },
                (error) => {
                    console.error(error);
                }
            );
            
        } 
        else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    return (
        <div>
            <button onClick={handleGeolocation}>Get Location</button>
            {locationPermission === "granted" && <p>Location access granted</p>}
            {locationPermission === "denied" && <p>Location access denied</p>}
            {locationPermission === "prompt" && <p>Prompt for location access</p>}
        </div>
    )
    }