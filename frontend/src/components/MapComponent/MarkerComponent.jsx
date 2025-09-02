
import { useState, useCallback, useRef } from 'react';

import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';




const centers = {
  lat: 43.5327,
  lng: -80.2262,
}


export default function MarkerComponent(props) {
    const [position, setPosition] = useState([props.lat, props.lng])

    const icon = L.icon({iconUrl: props.icon, iconSize: [26, 41], iconAnchor: [13, 41]});

    const map = useMapEvents({
      click(e) {
        // Handle map click event
        if (props.movable == true) {
          setPosition(e.latlng)
          if (props.setPosition) {
            props.setPosition(e.latlng)
          }
        }
        
      }
      // ... other event handlers
    });

    return(
        <Marker draggable={false} position={position}  icon={icon} ref={props.ref}>
        </Marker>
    );
}