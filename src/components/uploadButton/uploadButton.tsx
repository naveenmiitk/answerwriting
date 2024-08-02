"use client";

import React from 'react'
import {UploadButton} from './uploadthing'; 
import Link from 'next/link';


const UploadButtonBlue = () => {
  const [pdfLink, setPdfLink] = React.useState<string | null>("");
  const [fileName, setFileName] = React.useState<string | null>("");
  return (
    <div className="flex space-x-4 items-center">
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setPdfLink(res[0].url);
          setFileName(res[0].name);
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="flex pb-6">
        {pdfLink === "" ? null : (
          <Link href={pdfLink!} target="_blank" className="text-blue-500">
            <h1 className="font-semibold">{fileName}</h1>
          </Link>
        )}
      </div>
    </div>
  );
}

export default UploadButtonBlue;
