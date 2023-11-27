import React from 'react';
import AustinMap from './components/AustinMap';
import 'leaflet/dist/leaflet.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Austin Happy Hour Map</h1>
            </header>
            <AustinMap />
        </div>
    );
}

export default App;
