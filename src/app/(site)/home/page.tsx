import { api } from "@/lib/trpc/api";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";


export const dynamic = "force-dynamic";

const HomePageLoggedIn = async () => {
  // const data = await api.public.getRecentQuestionsTrpc.query();
  // console.log(data);
  // const data = await fetch("http://localhost:3001/questions").then(
  //   (res) => res.json());

  const data_raw = await Promise.all([
    api.public.getRecentQuestionsTrpc.query({}),
    // api.public.getTopQuestionsTrpc.query(),
  ]);
  const data = data_raw[0];
  console.log(data);
    
  return (
    <main>
      <section className="min-w-[400px] lg:min-w-[calc(70vw-2rem] max-w-5xl mx-auto py-2 flex">
        <div className="space-y-4 max-w-[70%] ">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Top Question</h1>
            <Button
              className="bg-blue-500 hover:bg-blue-500/90 max-w-fit"
              asChild
            >
              <Link href={`/question/ask`}>Ask Question</Link>
            </Button>
          </div>

          <div className="space-y-2">
            {data.map(async (question) => {
              const data_tag =
                await api.public.getAllTagOfQuestionByIdTrpc.query(question.id);
              return (
                <div
                  key={question.id}
                  className="space-y-1 border-[1px] border-neutral-200 p-4 rounded-md shadow-sm shadow-neutral-200"
                >
                  <div className="flex flex-col lg:flex-row lg:space-x-2 bg-blue-">
                    <div className="max-w-fit text-white w-full max-h-fit ">
                      <h1 className="text-sm text-green-600 border-[1px] border-green-600 p-2 py-1 rounded-md shadow-sm shadow-neutral-200">
                        {question.answerCount} answers
                      </h1>
                    </div>
                    <div className="flex flex-col space-y-2 w-full">
                      <Link
                        href={`/question/${question.id}/${question.slug}`}
                        className="text-[1rem] text-blue-600 hover:text-blue-700"
                      >
                        {question.title}
                      </Link>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex space-x-2">
                          {data_tag.map((tag, index) => (
                            <div
                              key={tag.slug}
                              className="max-w-fit p-2 bg-neutral-100 dark: bg-neutrual-800 rounded-lg"
                            >
                              <h1 className="">
                                <Link
                                  href={`/question/tag/${tag.slug}`}
                                  className="hover:text-blue-700 text-[0.8rem]"
                                >
                                  {tag.name}
                                </Link>
                              </h1>
                            </div>
                          ))}
                        </div>
                        <h1 className="text-neutral-500 text-right text-sm">
                          asked {moment(question.createdAt).fromNow(true)} ago
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="max-w-[30%]">

        </div>
      </section>
    </main>
  );
};

export default HomePageLoggedIn;
