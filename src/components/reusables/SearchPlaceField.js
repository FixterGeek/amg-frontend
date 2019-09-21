import React, { useEffect } from 'react';

import SearchField from './SearchField';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

function SearchPlaceField() {
  useEffect(() => {
    const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXOLs6pgumFSwvd3R3bqU4y2Cvm8Azj4&libraries=places';
      document.body.appendChild(script);
      script.onload = () =>{
        console.log('places are loaded');
      }
  }, []);

  const handleSearch = (value) => {
    const { google } = window;
    const request = {
      query: 'Museum of Contemporary Art Australia',
      fields: ['name', 'geometry'],
    };
    const mexico = new google.maps.LatLng(23.3137068, -111.6506934);
    const map = new google.maps.Map(document.getElementById('map'), {center: mexico, zoom: 15});
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      console.log(results, status);
    });
    console.log(value);
  }

  return (
    <div>
      <SearchField onSearch={handleSearch} fullWidth />
    </div>
  );
}

export default SearchPlaceField;
