import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function MapLocation({
  coordinates, title, street,
  colony, city, zipCode,
  zoom, onCoordinates, marckeable
}) {
  if (coordinates && !(coordinates[0] && coordinates[1])) {
    coordinates = [19.4389145, -99.1974394]
    title = 'Asociación Mexicana de Gastroenterología'
  }
  useEffect(() => {
    if (coordinates[0] && coordinates[1]) {
      let script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}`;
      document.body.appendChild(script);

      function setMarker(lat, lng, map) {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          title,
        });
        const makeMarker = () => {
          marker.setMap(map);
          return marker;
        }

        const removeMarker = () => {
          marker.setMap(null);
          return marker;
        }

        return {
          makeMarker,
          removeMarker,
        }
      }

      script.onload = () =>{
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: Number(coordinates[0]), lng: Number(coordinates[1]) },
          zoom,
        });

        const m = setMarker(Number(coordinates[0]), Number(coordinates[1]), map).makeMarker();

        if (marckeable) {
          map.addListener('click', (event) => {
            if (onCoordinates) onCoordinates([event.latLng.lat(), event.latLng.lng()])
            m.setPosition(new window.google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
          }, true)
        }
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
  title: PropTypes.string,
  zoom: PropTypes.number,
  marckeable: PropTypes.bool,
};

MapLocation.defaultProps = {
  coordinates: [19.4389145, -99.1974394],
  title: 'Evento Asociación Mexicana de Gastroenterología',
  zoom: 15,
  marckeable: false,
};
