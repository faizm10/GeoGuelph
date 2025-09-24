"use client";

import { MapComponent } from "@/components";
import type { LatLng } from "leaflet";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

type NullableFile = File | null;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Submit() {
  const [file, setFile] = useState<NullableFile>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const markerReference = useRef<any>(null);
  const [position, setPosition] = useState<LatLng | null>(null);

  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [mapDisabled, setMapDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files?.[0] ?? null;
    setFile(f);
    setMapDisabled(!f);
    setBtnDisabled(!f);

    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const uploadToStorage = useCallback(async (f: File) => {
    const ext = (f.name.split(".").pop() || "bin").toLowerCase();
    const path = `public/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from("images")
      .upload(path, f, {
        cacheControl: "3600",
        upsert: false,
        contentType: f.type || "application/octet-stream",
      });

    if (upErr) throw upErr;

    const { data } = supabase.storage.from("images").getPublicUrl(path);
    return { storagePath: path, publicUrl: data.publicUrl ?? null };
  }, []);

  const sendDataToDatabase = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      if (!file) return alert("Please upload a photo first.");
      if (!position) return alert("Please pick a location on the map.");

      try {
        setLoading(true);

        // 1) Upload the file to Storage
        const { storagePath, publicUrl } = await uploadToStorage(file);

        // 2) Insert metadata row
        const { error: dbErr } = await supabase.from("photos").insert({
          storage_path: storagePath,
          public_url: publicUrl,
          lat: position.lat,
          lng: position.lng,
          original_name: file.name,
        });

        if (dbErr) throw dbErr;

        alert("Uploaded! Image + coordinates saved.");

        // Reset UI
        setFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setPosition(null);
        setBtnDisabled(true);
        setMapDisabled(true);
      } catch (err: any) {
        console.error(err);
        alert(`Upload failed: ${err?.message ?? "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    },
    [file, position, preview, uploadToStorage]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-row border-black border-4 rounded-xl">
        <div className="flex flex-col m-5">
          <input
            id="form"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={onFileUpload}
          />
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="w-150 h-150 object-cover"
              src={preview}
              alt="preview"
            />
          ) : (
            <label htmlFor="form">
              <div className="flex w-150 h-150 border-dashed border-gray-300 border-2 bg-gray-100 items-center justify-center">
                <div>Upload Photo</div>
              </div>
            </label>
          )}
          {preview && (
            <label htmlFor="form">
              <div className="mt-3 p-5 flex items-center justify-center bg-orange-300 border-4 border-orange-600 rounded-xl text-orange-800 cursor-pointer">
                Change Photo
              </div>
            </label>
          )}
        </div>

        <div className="m-5">
          <MapComponent
            disabled={mapDisabled}
            setPosition={setPosition}
            width={150}
            height={150}
            map_styling="h-150"
            ref={markerReference}
          />
          {position && (
            <div className="mt-3 p-5 w-150 flex items-center justify-center bg-orange-300 border-4 border-orange-600 rounded-xl text-orange-800">
              <p>
                latitude: {position.lat}, longitude: {position.lng}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          disabled={btnDisabled || loading}
          onClick={sendDataToDatabase}
          className={`${
            btnDisabled || loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <div className="bg-yellow-400 m-5 text-lg font-bold p-4 rounded-xl border-yellow-600 border-4 ">
            {loading ? "Uploading..." : "Submit photo to database"}
          </div>
        </button>
      </div>

      <Link href="/">
        <button className="z-999999 flex absolute top-0 right-0 bg-gray-400 text-white m-8 p-3 rounded-2xl font-bold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="home.png" width="50" height="50" alt="home" />
        </button>
      </Link>
    </div>
  );
}
