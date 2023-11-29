import React, { useState, useEffect } from 'react';
import AustinMap from './components/AustinMap';
import 'leaflet/dist/leaflet.css';
import './App.css';


function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = searchTerm
                ? await fetch(`http://localhost:8080/api/restaurants/search?name=${searchTerm}`)
                : await fetch('http://localhost:8080/api/restaurants');
            const data = await response.json();
            setRestaurants(data);
        };

        fetchData();
    }, [searchTerm]);
    return (
        <div className="App">
            <header className="App-header">
                <h1>Atx Happy Hour Map</h1>
            </header>
            <AustinMap />
        </div>
    );
}

export default App;
