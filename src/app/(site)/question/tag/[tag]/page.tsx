import { api } from '@/lib/trpc/api'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props =  {
    params: {
        tag: string
    }
}

const TaggedPage = async ({params: {tag}}: Props) => {
  
  const verifyTag = await api.public.getTagIdFromSlugTrpc.query(tag);
  if (verifyTag.length === 0) {
    return (
      <p className="text-2xl text-center">This tag doesn&apos;t exists.</p>
    );
  };

  const data_tag = verifyTag[0];
  
  const data = await api.public.getAllQuestionsOfATagTRpc.query(data_tag.id);
  
  return (
    <main className='max-w-[1400px] mx-auto'>
      <section className="max-w-4xl ml-[1rem] md:ml-[2rem] lg:ml-[3rem] lg:border-r-[1px] border-neutral-200 pr-[2rem] my-[1rem]">
        <div>
          <h1 className="text-xl font-semibold">Tag : {data_tag.name}</h1>
          {data.map((question, index) => (
            <div
              key={question.id}
              className={cn(
                "p-4 space-y-2",
                index !== data.length - 1
                  ? "border-b-[1px] border-neutral-200"
                  : ""
              )}
            >
              <Link href={`/question/${question.id}/${question.slug}`}>
                <h1>
                  {index + 1}. {question.title}
                </h1>
              </Link>
              </div>
              
                 
              ))}
        </div>
      </section>
    </main>
  );
}

export default TaggedPage
