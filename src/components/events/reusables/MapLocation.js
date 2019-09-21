import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function MapLocation({ coordinates, title, street, colony, city, zipCode }) {
  if (coordinates && !(coordinates[0] && coordinates[1])) {
    coordinates = [19.4389145, -99.1974394]
    title = 'Asociación Mexicana de Gastroenterología'
  }
  useEffect(() => {
    if (coordinates[0] && coordinates[1]) {
      let script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXOLs6pgumFSwvd3R3bqU4y2Cvm8Azj4';
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
          zoom: 15,
        });

        const m = setMarker(Number(coordinates[0]), Number(coordinates[1]), map).makeMarker();

        map.addListener('click', (event) => {
          m.setPosition(new window.google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
        }, true)
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
};

MapLocation.defaultProps = {
  coordinates: [19.4389145, -99.1974394],
  title: 'Evento Asociación Mexicana de Gastroenterología'
};
