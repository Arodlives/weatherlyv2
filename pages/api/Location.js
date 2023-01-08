// import { useState, useEffect } from 'react';

// export default function Location() {
//     const [location, setLocation] = useState(null);
  
//     useEffect(() => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => console.log(error),
//         { enableHighAccuracy: true }
//       );
//     }, []);
  
//     return <div>Your location: {location ? `${location.lat}, ${location.lng}` : 'Loading...'}</div>;
//   }

// export function getLocationData() {
//     navigator.geolocation.getCurrentPosition(async function(position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       const locationData = {latitude: latitude, longitude: longitude};
//       const options = {
//         method: 'POST',
//         body: JSON.stringify(locationData),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       };
//     });
//   }

const express = require('express');
const router = express.Router();

router.post('/location', (req, res) => {
    const locationJson = req.body;
    // Use the locationJson object in the API
    console.log(locationJson);
    res.json({searchTerm:locationJson})
  });
  module.exports = router;