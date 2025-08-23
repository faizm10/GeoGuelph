'use client';



import {MapComponent} from "../../components";

import "leaflet/dist/leaflet.css";


const centers = {
  lat: 51.505,
  lng: -0.09,
}

export default function Play() {

    return (
        <MapComponent/>
    );
}