

import React from 'react';

import { useState, useCallback, useRef } from 'react';

import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import Link from 'next/link'

import "leaflet/dist/leaflet.css";

import MarkerComponent from "./MarkerComponent"

const icon = L.icon({ iconUrl: "marker-icon.png" });

const centers = {
  lat: 43.5327,
  lng: -80.2262,
}

export default function MyMap() {

  //const eventHandlers = null
    const markerReference = useRef(0);

    const submitGuess = () => {
        if (markerReference.current != 0) {
            alert(markerReference.current.getLatLng())
        }
    }

    return (
        <MapContainer className="h-screen" center={[43.5327, -80.2262]} zoom={15}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                
            </TileLayer>
            <MarkerComponent ref={markerReference}></MarkerComponent>
            
            <div className='z-99999999 flex absolute m-15 p-10 bg-gray-400  '><img src="display-image.png"/></div>

            <div className="z-9999999 flex absolute bottom-0 right-0 bg-blue">
                <button onClick={submitGuess} className="bg-blue-600 text-white m-8 p-3 px-5 rounded-full font-bold text-2xl" >Confirm!</button>
            </div>

            <Link href="/">
                <button className="z-999999 flex absolute top-0 right-0 bg-gray-400 text-white m-8 p-3 rounded-full font-bold" ><img src="home.png" width="50" height="50"/></button>
            </Link>
            
        </MapContainer>
    );
}
