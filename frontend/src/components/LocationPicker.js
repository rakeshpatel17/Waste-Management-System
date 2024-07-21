import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../images/marker-icon.png';
import markerShadow from '../images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationPicker = ({ initialPosition, setLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([initialPosition.lat, initialPosition.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const marker = L.marker([initialPosition.lat, initialPosition.lng], { draggable: true, icon: customIcon }).addTo(map);

    marker.on('dragend', function (event) {
      const latLng = event.target.getLatLng();
      setLocation({ lat: latLng.lat, lng: latLng.lng });
    });

    map.on('click', function (event) {
      marker.setLatLng(event.latlng);
      setLocation({ lat: event.latlng.lat, lng: event.latlng.lng });
    });

    return () => {
      map.remove();
    };
  }, [initialPosition, setLocation]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default LocationPicker;
