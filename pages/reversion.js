    import Image from 'next/image'
    import { useState, useEffect } from 'react';
    import {Paper,TextInput,Button,Text,Group} from "@mantine/core"
    import geohash from 'geohash.js';

    import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
    import { ActionIcon, useMantineColorScheme } from '@mantine/core';
    import { IconSun, IconMoonStars } from '@tabler/icons';
    //👍 1- if geolocation on browser is supported
    // 2- if it is supported then + permission granted => the data from the browser is then moved to
    // 3- Google maps api which will reverse geolocation with the given coordinates
    // 4- The city name from google maps will then be
    // 5- Queried into the api of Openweathermap
    // 6- Autotyped into the input box and automatically 'clicked' entered
    
    // 7-Else you'd have to manually type in the city itself
    
    export default function Home(){
    //? ➡️Api references
    const googleparam1 = process.env.googleapi;
    const openweatherparam1 = process.env.openweatherapikey;
    //? ➡️Location Permission state
    const[locationPermission,setLocationPermission]=useState(null);
    const [errorMessage, setErrorMessage] = useState(true);

    //? ➡️Manual input
    const[cityInput,setCityInput] = useState("");
    const[weatherData,setWeatherData]=useState({});
    //? ➡️Automatic location detect
    const [geohashValue, setGeohashValue] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState(null);
    
    function Demo() {
      const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
      const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
    

    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setLocationPermission("granted");
                    setErrorMessage(false);

                    //?Encoding geolocatino data
                    const geohashValue = geohash.encode(position.coords.latitude, position.coords.longitude);
                    setGeohashValue(geohashValue);
                    // console.log(geohashValue);

                    getData();
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setLocationPermission("denied");
                    } else {
                        console.error(error);
                        setLocationPermission("unavailable");
                    }
                },
                { enableHighAccuracy: true }
            );
        } else {
            setLocationPermission("unavailable");
        }
    }, []);
    
    //*For Usage of location
    function getCity(data) {
        if (data && data.results && data.results[0] && data.results[0].address_components) {
            for (let i = 0; i < data.results[0].address_components.length; i++) {
                if (data.results[0].address_components[i].types[0] === "locality") {
                    return data.results[0].address_components[i].long_name;
                }
            }
        }
        return null;
    }
    async function getData() {
        try {
            const {latitude, longitude} = geohash.decode(geohashValue);
            const res1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleparam1}`);
            const apidata1 = await res1.json();
            const city = getCity(apidata1);
            //? If there is a city from google api then it's passed 
            if(city) {
                const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherparam1}`);
                const apidata2 = await res2.json();
                console.log({ apidata1, apidata2 });
            } else {
                console.log('Invalid data returned from the Google Maps API or city not found');
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    //*For Manual input 
    async function getweatherdata(){
        try{const serverResponse=await fetch(
            "https://api.openweathermap.org/data/2.5/weather?"+
            "q="+cityInput+"&appid="+`${openweatherparam1}`+"&units=imperial"
            )
            const data =await serverResponse.json();
            console.log(data);
            if(data?.cod ==="400")throw data;
            setWeatherData(data);
        }
        catch(err){
            console.log(err);
        }
    }
    
    //? Conditional if location browser is not supported error msg will show
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      {errorMessage && (
        <Paper>
          <Text>Sorry, your browser does not support geolocation.</Text>
        </Paper>
      )}
    }


    if (locationPermission === "denied") {
        return <div>Location permission denied. Please enter your location manually.</div>;
    }
    if (locationPermission === "granted") {
        return <div>Latitude: {latitude}, Longitude: {longitude}
        {geohashValue}</div>;
    }
    
    return (
        <>
        <div style={{position:"static",height:"100vh",backgroundImage:"url('https://littlevisuals.co/images/atlantic_ride.jpg')",backgroundSize:"cover"}}>
    
          <div style={{
            position:"absolute",
            left:"50%",
            top:"50%",
            transform:"translate(-50%,-50%)",
          }}>
          <Paper withBorder p="lg" style={{maxWidth:"500px"}}>
            <Group position="apart">
              <Text size="lg" weight={500}>
                Get Weather Here Below
              </Text>
            </Group>
            <Group position="apart" mb="xs">
              <TextInput size="lg" 
              label="City Name" 
              placeholder='ex: San Diego'
              onChange={(e)=>setCityInput(e.target.value)}
              />
            </Group>
            <Group position="apart">
              <Button variant="gradient" size="md" onClick={() => getweatherdata()} >
                WeatherNow
              </Button>
            </Group>
            {Object.keys(weatherData).length !==0?
            <>
            <Group position="left" mb="xs">
              <Text>
                {weatherData.name} Weather 
              </Text>
            </Group>
            <Group position="left" mb="xs">
              <Image
               src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon+".png"}
               width={"100"} height={"100"} alt="weather" 
              />
    
              <Text size="lg" weight={500}>
                Currently {weatherData.main.temp} &deg;F 
              </Text>
            </Group>
            </>
            :null}
          </Paper>
          </div>
        </div>
        </>
      )
    }
    // return(
    // <div>
    //     {/* Calls getweatherdata() + value from input is setinto object of cityinput */ }
    //     <input type="text" placeholder="CityName here" onChange={(e)=>setCityInput(e.target.value)}>
    //     </input>
        
    //     {/* <h1>
    //     {weatherData.name} Weather 
    //     </h1>
    //     <Image
    //     src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon+".png"}
    //     width={"100"} height={"100"} alt="weather" 
    //     />
    //     Currently {weatherData.main.temp} &deg;F */}
    // </div>
    // )


    
//     There are a few things that you may want to consider:

// The if (typeof navigator !== 'undefined' && navigator.geolocation) check should be wrapped in a useEffect hook, so that the geolocation request is made every time the component re-renders.
// You will need to handle the case where the user denies location permission.
// You will need to handle the case where the user doesn't have geolocation enabled on their browser.
// You should not use console.log() in a production code and replace it by something more useful like displaying the data to the user or storing the data in an API.
// You might want to add some error handling in case the API calls fail.
// You might want to add some UI elements to display the data to the user.
// You might want to add some validation to the user input before sending the request.