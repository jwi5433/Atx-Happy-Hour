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

    const formatSpecials = (specials) => {
      return specials.split(';').map((item, index) => <div key={index}>{item.trim()}</div>);
    };
  const austinBounds = [
    [29.9, -98.1],
    [30.7, -97.3]
  ];

  return (
    <MapContainer
      center={[30.2672, -97.7431]}
      zoom={13}
      minZoom={12}
      maxZoom={17}
      maxBounds={austinBounds}
      style={{ height: '100vh', width: '100vw' }}
    >

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {restaurants.map(restaurant => (
        <Marker key={restaurant.id} position={[restaurant.latitude, restaurant.longitude]}>
          <Popup>
            <div>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{restaurant.name}</h2>
              <p style={{ fontWeight: 'bold' }}>Hours:</p>
              <p>{restaurant.happyHourDetails.timeFrame}</p>
              <p style={{ fontWeight: 'bold' }}>Specials:</p>
              {formatSpecials(restaurant.happyHourDetails.menuItems)}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default AustinMap;