import TracingPath from "@/components/question/TracingPath";
import { Button } from "@/components/ui/button";
import { getUserAuth } from "@/lib/auth/utils";
import { api } from "@/lib/trpc/api";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const QuestionPage = async ({ params: { id } }: Props) => {
    if(!parseInt(id)){
      return (
        <p className="text-2xl text-center">
          This question doesn&apos;t exists.
        </p>
      );
    }
    const data  = await api.public.getQuestionByIdTrpc.query(parseInt(id));
    // console.log(data);
    if(data.length === 0){
      return <p className="text-2xl text-center">This question doesn&apos;t exists.</p>;
    }
    const question = data[0];
    redirect(`/question/${question.id}/${question.slug}`);
  return (
    <div className="">
      <div className="flex space-x-[2rem] border-b-[1px] border-neutral-200 pb-[2rem] ">
        <div className="max-w-[80%] mx-0 ">
          <h1 className="text-2xl">
            {question.title}
          </h1>
        </div>

        <Button className="bg-blue-500 hover:bg-blue-500/90" asChild>
        <Link href={`/question/ask`}>Ask Question
        </Link>
        </Button>
        {/* <TracingPath/> */}
      </div>
    </div>
  );
};

export default QuestionPage;
