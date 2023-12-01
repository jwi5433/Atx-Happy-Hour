import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapUpdater from './MapUpdater';

const AustinMap = ({ restaurants, selectedLocation, selectedRestaurant }) => {
    const markerRefs = useRef(new Map());
    const [userLocation, setUserLocation] = useState(null);
    const [openPopupName, setOpenPopupName] = useState(null);

  useEffect(() => {
    if (selectedRestaurant) {
        const marker = markerRefs.current.get(selectedRestaurant.name);
        if (marker) {
            marker.openPopup();
        }
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, [selectedLocation], [selectedRestaurant]);

  const restaurantIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const userLocationIcon = new L.Icon({
    iconUrl: "/icons/location-pin.png", // Update with the correct path to your icon
    iconSize: [35, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

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
      <MapUpdater selectedLocation={selectedLocation} />
      {userLocation && (
        <Marker position={userLocation} icon={userLocationIcon}>
          <Popup>You are here.</Popup>
        </Marker>
      )}
     {restaurants.map((restaurant, index) => (
         <Marker key={index} /* or {restaurant.name} */ position={[restaurant.latitude, restaurant.longitude]} icon={restaurantIcon} ref={(ref) => { if (ref) { markerRefs.current.set(restaurant.name, ref); } }}>
          <Popup open={restaurant.name === openPopupName}>
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