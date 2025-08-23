
import { useState, useCallback, useRef } from 'react';

import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

const icon = L.icon({ iconUrl: "marker-icon.png" });

const centers = {
  lat: 43.5327,
  lng: -80.2262,
}


export default function MarkerComponent(props) {
    const [position, setPosition] = useState(centers)

    const map = useMapEvents({
      click(e) {
        // Handle map click event
        setPosition(e.latlng)
        console.log('Map clicked at:', e.latlng);
      }
      // ... other event handlers
    });

    return(
        <Marker draggable={false} position={position}  icon={icon} ref={props.ref}>
        </Marker>
    );
}