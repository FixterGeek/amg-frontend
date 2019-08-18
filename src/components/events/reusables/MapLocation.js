import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function MapLocation({ coordinates }) {
  useEffect(() => {
    if (coordinates) {
      let script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXOLs6pgumFSwvd3R3bqU4y2Cvm8Azj4';
      document.body.appendChild(script);
      script.onload = () =>{
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 19.4199552, lng: -99.1567872 },
          zoom: 8,
        });

        const marker = new window.google.maps.Marker({
          position: { lat: 19.4199552, lng: -99.1567872 },
          map,
          title: 'Here!',
        });
      }
    }
  }, [window.google]);

  return (
    <div id="map" className="component-map">
      { !coordinates && 'Ubicación no disponible.' }
    </div>
  );
}

export default MapLocation;

MapLocation.propTypes = {
  /**
   * [latitude, longitude]
   */
  coordinates: PropTypes.shape([PropTypes.string, PropTypes.string]),
};

MapLocation.defaultPtops = {
  coordinates: null
};
