

import React from 'react';

import { useState, useCallback, useRef } from 'react';

import { MapContainer, Marker, TileLayer, useMapEvents, Polyline } from 'react-leaflet';

import Link from 'next/link'

import "leaflet/dist/leaflet.css";

import MarkerComponent from "./MarkerComponent"


// look into `bounds={mapBounds}` prop in MapContainer
const mapBounds = [
  [43.522397, -80.228183],
  [43.552290, -80.223904],
]



export default function Map(props) {

  //const eventHandlers = null
   // const markerReference = useRef(0);
    const destinationMarkerReference = useRef(0);

    const photo_lat = 43.532735; // placeholder (photos and their coords will be pulled from database)
    const photo_lng = -80.233023 // placeholder ^^^^



 
    // <Polyline pathOptions={'red'} positions={[markerReference.current.getLatLng(), L.latLng(photo_lat, photo_lng)]}></Polyline>
    // <MarkerComponent lat={photo_lat} lng={photo_lng} icon={"red-marker-icon.png"} ref={destinationMarkerReference}></MarkerComponent>

    return (
        <MapContainer className={`${props.disabled ? "grayscale pointer-events-none" : props.map_styling} w-${props.width} h-${props.height}`} center={[43.528778, -80.2162353]} zoom={15} scrollWheelZoom={!(props.disabled)} dragging={!(props.disabled)} doubleClickZoom={!props.disabled} touchZoom={!props.disabled} keyboard={props.disabled} zoomControl={!props.disabled}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
            {!props.disabled && <MarkerComponent setPosition={props.setPosition} movable={true} lat={43.5327} lng={-80.2262} icon={"blue-marker-icon.png"} ref={props.ref}></MarkerComponent>}
                              
            {props.children}
        </MapContainer>
    );
}
