import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const Tracking = ({ lati, long }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map if it's not already initialized
      const map = L.map('map').setView([17.233532, 78.542557], 11);
      mapRef.current = map;

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map);

      const taxiIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/128/1048/1048329.png',
        iconSize: [50, 50]
      });

      const marker = L.marker([17.233532, 78.542557], { icon: taxiIcon }).addTo(map);
      markerRef.current = marker;
    }

    // Handle routing and marker movement
    const handleTrack = () => {
      const latValue = parseFloat(lati);
      const lngValue = parseFloat(long);

      if (isNaN(latValue) || isNaN(lngValue)) {
        alert('Please enter valid latitude and longitude values.');
        return;
      }

      if (mapRef.current) {
        // Cleanup previous routing control if it exists
        if (routingControlRef.current) {
          mapRef.current.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(17.233532, 78.542557),
            L.latLng(latValue, lngValue)
          ],
          createMarker: () => null, // Avoid adding additional markers
          routeWhileDragging: true
        }).on('routesfound', function (e) {
          const routes = e.routes;
          const coordinates = routes[0].coordinates.map(coord => ({
            lat: coord.lat,
            lng: coord.lng
          }));
          moveMarker(coordinates); // Move the marker along the route
        }).addTo(mapRef.current);
      } else {
        console.warn("Map is not yet initialized. Skipping routing.");
      }
    };

    const moveMarker = (coords) => {
      let i = 0;

      const move = () => {
        if (i < coords.length && markerRef.current) {
          markerRef.current.setLatLng([coords[i].lat, coords[i].lng]);
          i++;
          setTimeout(move, 500); // Adjust timing for smoother movement
        }
      };

      move(); // Start the movement
    };

    handleTrack();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        if (routingControlRef.current) {
          mapRef.current.removeControl(routingControlRef.current);
        }
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
        routingControlRef.current = null;
      }
    };
  }, [lati, long]);

  return (
    <div id="map" style={{ width: '100%', height: '50vh' }}></div>
  );
};

export default Tracking;