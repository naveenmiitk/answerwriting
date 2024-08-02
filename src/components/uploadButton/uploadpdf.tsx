"use client";

import Link from "next/link";
import React, { useState } from "react";

const UploadPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        throw new Error(JSON.stringify(error.message));
        // throw new Error("Upload failed");
      }

      // console.log("Upload successful!");

      const json = await response.json();
      console.log(json);
      setUrl(json.url);
      setFileName(json.fileName);
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message.slice(1,-1) || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 items-center justify-center min-h-[2rem]"
    >
      <div className="flex space-x-4">
        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
        <button type="submit" disabled={isLoading} className="bg-black hover:bg-black p-2 rounded-lg text-white px-4 shadow-sm shadow-black">
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {url ? (
        <Link href={url!} className="text-blue-500 font-semibold" target="_blank">
          {fileName}
        </Link>
      ) : (
        ""
      )}
      {error && <p className="error text-red-600">{error}</p>}
    </form>
  );
};

export default UploadPDF;

