import React, { useState, useEffect } from 'react';
import AustinMap from './components/AustinMap';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

const selectSuggestion = (name) => {
    const foundRestaurant = restaurants.find(r => r.name === name);
    if (foundRestaurant) {
        setMapCenter([foundRestaurant.latitude, foundRestaurant.longitude]);
        setSelectedRestaurant(foundRestaurant);
    }
    setSuggestions([]);
    setSearchTerm('');
};

const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
        const response = await fetch(`http://localhost:8080/api/restaurants/searchByName?name=${encodeURIComponent(value)}`);
        const data = await response.json();
        setSuggestions(data);
    } else {
        setSuggestions([]);
    }
};


const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with term:", searchTerm);
    fetchRestaurants();
    setShowSearch(false);
};


const fetchRestaurants = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/restaurants');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setRestaurants(data);
    } catch (error) {
        console.error('Failed to fetch restaurants:', error);

    }
};

useEffect(() => {
    fetchRestaurants();
}, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Austin Happy Hour Map</h1>
            </header>
                <button
                    className="Search-toggle"
                    onClick={() => setShowSearch(!showSearch)}
                    style={{ backgroundColor: 'steelblue', color: 'white', border: 'black', padding: '10px' }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
             {showSearch && (
            <form className="Search-bar" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search Restaurants"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {suggestions.length > 0 && (
                    <ul className="Autocomplete-suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => selectSuggestion(suggestion.name)}>
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
             <button type="submit" hidden>Search</button>
            </form>

            )}
            <AustinMap restaurants={restaurants} selectedLocation={mapCenter} selectedRestaurant={selectedRestaurant} />
        </div>
    );
}

export default App;