"use client";

import { trpc } from '@/lib/trpc/client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

const TracingPath = () => {
     const params = useParams<{ id: string; slug: string }>();
    //  console.log(params);
     const router = useRouter();
     const {data} = trpc.public.getQuestionByIdTrpc.useQuery(parseInt(params.id));
     if(!data) {
      return <></>;
     }
    //  console.log(data[0].slug);
     if(data[0].slug !== params.slug){
      router.replace(`/question/${params.id}/${data[0].slug}`);
     }
    //  router.replace(`/question/${params.id}`);
  return <></>;
}

export default TracingPath
