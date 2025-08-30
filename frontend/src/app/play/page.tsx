'use client';



import {MapComponent} from "../../components";

import Link from 'next/link'

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer, useMapEvents, Polyline } from 'react-leaflet';

import L from 'leaflet';

import { useState, useCallback, useRef } from 'react';

import MarkerComponent from "../../components/MapComponent/MarkerComponent"
import { Console } from "console";

const centers = {
  lat: 51.505,
  lng: -0.09,
}

// <div className='z-99999999 flex absolute m-15 rounded-3xl border-black border-6'><img className="rounded-2xl" src="display-image.png"/></div>

export default function Play() {

    //const eventHandlers = null
        const markerReference = useRef<any>(0);
        const destinationMarkerReference = useRef(0);

    
        const photo_lat = 43.53285836327501 // placeholder (photos and their coords will be pulled from database)
        const photo_lng = -80.2332955946433 // placeholder ^^^^
    
        /* 
        TODO:

        The current issue is that the marker moves to wherever the user clicks which is what we want BUT we don't want it to move
        if the user is clicking the "confirm" button since it moves the marker first before doing the button event handler which calculates distance.
        So instead of using the original placement of the marker for distance calulcation it uses the location right under the button

        Also need to create the upload image page (look at uwguesser as reference https://uwguessr.com/upload)
        
        */

        const submitGuess = (e: any) => {
            if (markerReference.current != 0) {
                L.DomEvent.stopPropagation(e);
                console.log("Marker Location: " + markerReference.current.getLatLng() + "\nDistance from Photo: " + markerReference.current.getLatLng().distanceTo([photo_lat, photo_lng]) + " meters.")
                //markerReference.current.movable = true;
            }
            
        }


    return (
        <div>
            <MapComponent map_styling="h-screen" ref={markerReference}>
                
                              
                <div className="z-9999999 flex absolute bottom-0 right-0 bg-blue">
                    <button onClick={submitGuess} className="bg-blue-600 text-white m-8 p-3 px-5 rounded-full font-bold text-2xl" >Confirm!</button>
                </div>
                
                
                <div className='z-99999999 flex absolute m-15 rounded-3xl border-black border-6'><img className="rounded-2xl" src="display-image.png"/></div>
                            
                
                <Link href="/">
                    <button className="z-999999 flex absolute top-0 right-0 bg-gray-400 text-white m-8 p-3 rounded-2xl font-bold" ><img src="home.png" width="50" height="50"/></button>
                </Link>
            </MapComponent>
        </div>
        
    );
}