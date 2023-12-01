import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';


const MapUpdater = ({ selectedLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedLocation) {
            map.flyTo(selectedLocation, 15);
        }
    }, [selectedLocation, map]);

    return null;
};

export default MapUpdater;