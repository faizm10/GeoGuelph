'use client'; // 

import Image from "next/image";

import { useState } from 'react';



export default function Home() {
  const [currentPage, setPage] = useState('Home');

  const renderPage = () => {
    if (currentPage == "Home") {
      return (
        <HomePage/>
      );
    }
    else if (currentPage == "Upload") {
      return (
        <UploadPage/>
      );
    }
    else if (currentPage == "Submit") {
      return (
        <SubmitPage/>
      );
    }
  }

  return (
    <div>

        <nav>
          <button onClick={() => setPage('Upload')}>Upload</button>
          <button onClick={() => setPage('Submit')}>Submit Photos</button>
        </nav>
        {renderPage()}
   
    </div>
  );
}

function HomePage() {
  return (
    <p>Home Page</p>
  );
}


function UploadPage() {
  return (
    <p>Upload Page</p>
  );
}

function PlayPage() {
  return (
    <p>Play Page</p>
  );
}

function SubmitPage() {
  return (
    <p>Submit Photos Page</p>
  );
}
