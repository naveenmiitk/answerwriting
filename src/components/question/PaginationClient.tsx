"use client";

import React from 'react'
import { useSearchParams } from "next/navigation";

const PaginationClient = () => {
     const searchParams = useSearchParams();
     const page_string = searchParams.get("page") || "1";
     const pageSize_string = searchParams.get("pageSize") || "10";
     const page = parseInt(page_string);
     const pageSize = parseInt(pageSize_string);
    //  console.log(page, pageSize);
     
  return (
    <div>
      
    </div>
  )
}

export default PaginationClient
