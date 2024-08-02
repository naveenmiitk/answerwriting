import { api } from '@/lib/trpc/api';
import { cn } from '@/lib/utils';
import moment from 'moment';
import Link from 'next/link';
import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaginationClient from '@/components/question/PaginationClient';

export const dynamic = "force-dynamic";

const Homepage = async () => {
  const data = await api.public.getRecentQuestionsTrpc.query({});
  const data_tag = await api.public.getMostTaggedTrpc.query();
  return (
    <main className="max-w-[1400px] mx-auto dark:bg-brandBackground flex flex-col lg:flex-row">
      <section className="lg:min-w-[850px] lg:max-w-4xl ml-[1rem] md:ml-[2rem] lg:ml-[3rem] lg:border-r-[1px] border-neutral-200 pr-[2rem] my-[1rem]">
        <div>
          <PaginationClient/>
          {data.map(async (question, index) => {
            const tag = await api.public.getAllTagOfQuestionByIdTrpc.query(
              question.id
            );
            return (
              <div
                key={question.id}
                className={cn(
                  "p-4 space-y-2 min-w-3xl",
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
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 items-center justify-start">
                    {tag.map((tag, index) => (
                      <div
                        key={tag.slug}
                        className={cn(
                          "max-w-fit rounded-xl px-1 py-1 bg-tangerine-100 dark:bg-neutral-100 bg-blend-overlay"
                          // index % 2 === 0
                          //   ? "hover:bg-rose-200 hover:dark:bg-rose-500"
                          //   : "hover:bg-blue-200 hover:dark:bg-blue-500",
                          // index === 0
                          //   ? "hover:bg-rose-200 dark:bg-rose-500"
                          //   : "",
                          // index === 1
                          //   ? "hover:bg-blue-200 hover:dark:bg-blue-500"
                          //   : "",
                          // index === 2
                          //   ? "hover:bg-amber-200 hover:dark:bg-amber-500"
                          //   : "",
                          // index === 3
                          //   ? "hover:bg-violet-200 hover:dark:bg-violet-500"
                          //   : "",
                          // index === 4
                          //   ? "hover:bg-violet-200 hover:dark:bg-violet-500"
                          //   : ""
                        )}
                      >
                        <h1 className="">
                          <Link
                            href={`/question/tag/${tag.slug}`}
                            className="hover:text-tangerine-950 p-2 text-[0.8rem] font-semibold text-primary dark:text-primary-foreground text-tangerine-900"
                          >
                            {tag.name}
                          </Link>
                        </h1>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end space-x-[1rem]">
                    <h1 className="text-sm text-tangerine-900 dark:text-neutral-100">
                      {question.answerCount} answers
                    </h1>
                    <p className="text-tangerine-700 dark:text-neutral-100 text-sm">
                      modified
                      <span className="mx-1 text-tangerine-900 dark:text-neutral-100">
                        {moment(question.updatedAt).fromNow(true)} ago
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
      <section className="lg:w-[300px] p-[2rem]">
        <div className="p-4 bg-neutral-50 dark:bg-gray-800 min-h-[10rem] flex flex-col rounded-lg space-y-2 text-[1.0rem]">
          <h1 className="text-xl text-tangerine-950 font-semibold dark:text-neutral-100">
            Top Tags
          </h1>
          {data_tag.map((tag) => (
            <Link
              href={`/question/tag/${tag.slug}`}
              className="p-1 px-2 bg-tangerine-100 text-[0.8rem] font-semibold text-tangerine-950 max-w-fit rounded-lg dark:text-neutral-100 dark:bg-neutral-800"
              key={tag.slug}
            >
              {tag.name} x {tag.count}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Homepage
