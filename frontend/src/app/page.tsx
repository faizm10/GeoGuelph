'use client'; // 

import Image from "next/image";

import { useState } from 'react';

import { Button } from "@/components/Button";

import Link from 'next/link'


export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen justify-center">

      <div>
        <h1 className="text-8xl">GeoGuelph</h1>
      </div>


      <div className="flex flex-row gap-4">
        <nav>

          <span>
            <Link href="/play">
              <button className="bg-black text-white m-8 p-3 px-5 rounded-full font-bold" >Upload</button>
            </Link>
            
          </span>
          <span>
            <Link href="/submit">
              <button className="bg-black text-white m-8 p-3 px-5 rounded-full font-bold" >Submit</button>
            </Link>
          </span>  
        </nav>
      </div>
    </div>
  );
}

