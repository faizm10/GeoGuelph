'use client'

import { MapComponent } from "@/components";
import { LatLng } from "leaflet";

import Link from 'next/link'
import { useState, useRef } from "react";

export default function Submit() {

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState<string | null>(null)
    const markerReference = useRef<any>(null);
    const [position, setPosition] = useState<LatLng | null>(null);

    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
    const [mapDisabled, setMapDisabled] = useState<boolean>(true);

    const onFileUpload = (event: any) => {
        setMapDisabled(false)
        setBtnDisabled(false)
        setFile(event.target.files[0])
        console.log(event.target.files[0])
        if (event.target.files[0]) {
            const photoURL = URL.createObjectURL(event.target.files[0]);
            setPreview(photoURL);
            console.log(photoURL)
        }
    }

    const sendDataToDatabase = (event: any) => {
        if (position) {
            alert("Connect button to database\nSend photo + location when button clicked")
        }
        
        // send position state variable + photo (we might need to download the user uploaded photo, cause I think photoURL variable is temporary)
    }

    return (
    <div className="flex flex-col items-center justify-center h-screen ">
        <div className="flex flex-row border-black border-4 rounded-xl">
            <div className="flex flex-col m-5">
                <input id="form" className="hidden" type="file" accept="image/*" onChange={(event) => onFileUpload(event)}></input>
                {preview ? (<img className="w-150 h-150" src={preview}></img>) : (<label htmlFor="form"><div className="flex w-150 h-150 border-dashed border-gray-300 border-2 bg-gray-100 items-center justify-center"><div>Upload Photo</div></div></label>)}
                {preview && <label htmlFor="form"><div className="mt-3 p-5 flex items-center justify-center bg-orange-300 border-4 border-orange-600 rounded-xl text-orange-800">Change Photo</div></label>}
            </div>

            <div className="m-5">
                <MapComponent disabled={false} setPosition={setPosition} width={150} height={150} map_styling="h-150" ref={markerReference}></MapComponent>
                
                {position && (<div className="mt-3 p-5 w-150 flex items-center justify-center bg-orange-300 border-4 border-orange-600 rounded-xl text-orange-800"><p>latitude: {position.lat}, longitude: {position.lng}</p></div>)}
                
            </div>
        </div>

        <div>
            <button disabled={btnDisabled} onClick={(event) => {sendDataToDatabase(event)} }>
                <div className="bg-yellow-400 m-5 text-lg font-bold p-4 rounded-xl border-yellow-600 border-4 ">
                    Submit photo to database    
                </div>
            </button>
        </div>

        <Link href="/">
            <button className="z-999999 flex absolute top-0 right-0 bg-gray-400 text-white m-8 p-3 rounded-2xl font-bold" ><img src="home.png" width="50" height="50"/></button>
        </Link>
    </div>
    );
}