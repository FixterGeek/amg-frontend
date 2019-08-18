import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function MapLocation({ coordinates, street, colony, city, zipCode }) {
  console.log(coordinates)
  useEffect(() => {
    if (coordinates[0] && coordinates[1]) {
      let script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXOLs6pgumFSwvd3R3bqU4y2Cvm8Azj4';
      document.body.appendChild(script);
      script.onload = () =>{
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: Number(coordinates[0]), lng: Number(coordinates[1]) },
          zoom: 8,
        });

        const marker = new window.google.maps.Marker({
          position: { lat: Number(coordinates[0]), lng: Number(coordinates[1]) },
          map,
          title: 'Here!',
        });
      }
    }
  }, [window.google]);

  return (
    <div>
      <div id="map" className="component-map">
        { !(coordinates[0] && coordinates[1]) && 'Ubicación no disponible.' }
      </div>
      <div>
        { street && `${street}, ` }
        { colony && `${colony}, ` }
        { city && zipCode ? `${city}, ` : city ? `${city}.` : null }
        { zipCode && `${zipCode}. ` }
      </div>
    </div>
  );
}

export default MapLocation;

MapLocation.propTypes = {
  /**
   * [latitude, longitude]
   */
  coordinates: PropTypes.shape(
    [
      PropTypes.oneOf([PropTypes.string, PropTypes.number]),
      PropTypes.oneOf([PropTypes.string, PropTypes.number])
    ]
  ),
};

MapLocation.defaultProps = {
  coordinates: []
};
