import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const Tracking = ({lati,long}) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  // const [lat, setLat] = useState('');
  // const [lng, setLng] = useState('');

  useEffect(() => {
    if (mapRef.current) {
      return;
    }
  
    const map = L.map('map').setView([17.233532, 78.542557], 11);
    mapRef.current = map;
  
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);
  
    const taxiIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/1048/1048329.png',
      iconSize: [70, 70]
    });
  
    const marker = L.marker([17.233532, 78.542557], { icon: taxiIcon }).addTo(map);
    markerRef.current = marker;
  
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lati,long]);
  

  const moveMarker = (coords) => {
    let i = 0;

    const move = () => {
      if (i < coords.length) {
        markerRef.current.setLatLng([coords[i].lat, coords[i].lng]);
        i++;
        setTimeout(move, 100); 
      }
    };
    const latValue = parseFloat(lati);
    const lngValue = parseFloat(long);

    if (isNaN(latValue) || isNaN(lngValue)) {
      alert('Please enter valid latitude and longitude values.');
      return;
    }

    if (mapRef.current && markerRef.current) {
      L.marker([latValue, lngValue]).addTo(mapRef.current);

      L.Routing.control({
        waypoints: [
          L.latLng(17.233532,78.542557),
          L.latLng(latValue, lngValue)
        ]
      }).on('routesfound', function (e) {
        const routes = e.routes;
        console.log(routes);

        // Move the marker along the route
        moveMarker(routes[0].coordinates);

      }).addTo(mapRef.current);
    }
    move();
  };


  return (
    <div>
      {/* <div>
        <input 
          type="text" 
          value={lat} 
          onChange={(e) => setLat(e.target.value)} 
          placeholder="Enter Latitude" 
        />
        <input 
          type="text" 
          value={lng} 
          onChange={(e) => setLng(e.target.value)} 
          placeholder="Enter Longitude" 
        />
        <button onClick={handleTrack}>Track Location</button>
      </div> */}
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default Tracking;
