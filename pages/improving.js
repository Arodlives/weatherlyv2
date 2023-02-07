useEffect(() => {
    // get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  
        // use the latitude and longitude to get the city name
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
          .then((response) => response.json())
          .then((data) => {
            // get the city name from the data
            const city = data.results[0].formatted_address;
  
            // pass the city name to the OpenWeatherMap API to get the weather data
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
          })
          .then((response) => response.json())
          .then((data) => {
            setWeatherData(data);
          });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);