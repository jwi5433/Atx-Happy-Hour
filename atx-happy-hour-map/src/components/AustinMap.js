import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const AustinMap = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {

    fetch('http://localhost:8080/api/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data));

  }, []);

  return (
    <MapContainer
      center={[30.2672, -97.7431]}
      zoom={13}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {restaurants.map(restaurant => (
        <Marker key={restaurant.id} position={[restaurant.latitude, restaurant.longitude]}>
          <Popup>
            {restaurant.name}
            {/* Include more details in the popup if needed */}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default AustinMap;