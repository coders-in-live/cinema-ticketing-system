import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '50vh',
};
const center = {
    lat: 9.021458109560466, // Gastmall latitude
    lng:38.841966068359895, // Gastmall longitude
  };
  

const GoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDOzww1eAJ0ycw8LZnfg5kuc3yVK-qMzCA',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
        
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;