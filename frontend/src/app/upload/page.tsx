'use client'

import { MapComponent } from "@/components";

import Link from 'next/link'
import { useState } from "react";

export default function Submit() {

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState<string | null>(null)

    const onFileUpload = (event: any) => {
        setFile(event.target.files[0])
        if (file) {
            const photoURL = URL.createObjectURL(file);
            setPreview(photoURL);
        }
    }

    return (
    <div className="flex flex-col items-center h-screen justify-center">
        <div className="flex flex-row border-black border-4 rounded-xl">
            <div className="w-75 h-75 m-5 border-dashed border-gray-300 border-2 bg-gray-100 ">
                {preview ? (<img className="w-75 h-75" src={preview}></img>) : (<input className="p-10" type="file" accept="image/*" onChange={onFileUpload}></input>)}
            </div>

            <div className="m-5">
                <MapComponent map_styling="w-75 h-75"></MapComponent>
            </div>
        </div>
    </div>
    );
}