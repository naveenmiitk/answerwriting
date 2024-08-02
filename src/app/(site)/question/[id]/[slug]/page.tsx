import AllAnswers from "@/components/question/AllAnswers";
import SubmitAnswerComponent from "@/components/question/SubmitAnswerComponent";
import TracingPath from "@/components/question/TracingPath";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/api";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { CircleChevronRight } from "lucide-react";
import posthog from "posthog-js";

type Props = {
  params: {
    id: string;
  };
};
const QuestionSlugPage = async ({ params: { id } }: Props) => {
  if (!parseInt(id)) {
    return (
      <p className="text-2xl text-center">This question doesn&apos;t exists.</p>
    );
  }
  const data = await api.public.getQuestionByIdTrpc.query(parseInt(id));
  // console.log(data);
  if (data.length === 0) {
    return (
      <p className="text-2xl text-center">This question doesn&apos;t exists.</p>
    );
  }
  const question = data[0];
  const data_answers = await api.public.getAnswersOfQuestionByIdTrpc.query(
    parseInt(id)
  );
  // console.log(data_answers);

  const data_tag = await api.public.getAllTagOfQuestionByIdTrpc.query(
    parseInt(id)
  );
  // console.log(data_tag);

  const data_reletedQuestions = await api.public.getRelatedQuestionsTrpc.query(
    parseInt(id)
  );
  // console.log(data_reletedQuestions);

  posthog.capture("question view", { property: {
    id: question.id,
    title: question.title,
    slug: question.slug,
  } });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:min-w-[calc(70vw-2rem]  max-w-[calc(100vw-2rem] lg:max-w-[calc(50vw-2rem)] space-y-4  lg:ml-[2rem] py-4 p-4 border-r-[1px] border-neutral-100 dark:border-neutral-700">
        {/* <h1>Question Page</h1> */}
        <TracingPath />
        <div className="flex flex-col lg:flex-row lg:space-x-[2rem] space-y-[1rem] border-b-[1px] border-neutral-100 dark:border-neutral-700 pb-[2rem] ">
          <div className=" ml-0 flex-1">
            <h1 className="text-xl">{question.title}</h1>
            <div className="flex items-center justify-between">
              <p className="text-neutral-500 dark:text-neutral-100 text-sm">
                Asked
                <span className="mx-1 text-neutral-800 dark:text-neutral-100">
                  {moment(question.createdAt).fromNow(true)} ago
                </span>
              </p>
              <p className="text-neutral-500 dark:text-neutral-100 text-sm">
                modified{" "}
                <span className="mx-1 text-neutral-800 dark:text-neutral-100">
                  {moment(question.updatedAt).fromNow(true)} ago
                </span>
              </p>
            </div>
          </div>

          <Button
            className="max-w-fit bg-tangerine-500 hover:bg-tangerine-600"
            asChild
          >
            <Link href={`/question/ask`}>Ask Question</Link>
          </Button>
        </div>

        <div className="p-4">
          <p className="text-normal whitespace-pre-line">{question.body}</p>
        </div>
        <div className="p-4 flex gap-4">
          {data_tag.map((tag, index) => (
            <div
              key={tag.slug}
              className="max-w-fit p-2 bg-neutral-100 dark:bg-neutrual-800 rounded-lg dark:text-primary-foreground"
            >
              <h1>
                <Link href={`/question/tag/${tag.slug}`} className="text-sm">
                  {tag.name}
                </Link>
              </h1>
            </div>
          ))}
        </div>

        <div>
          <AllAnswers questionId={question.id} data_answers={data_answers} />
        </div>

        <div>
          {/* <SubmitAnswer questionId={question.id}/> */}
          <SubmitAnswerComponent questionId={question.id} />
        </div>
      </div>

      <div className="space-y-4 max-w-6xl lg:ml-[2rem] py-4 p-4  border-neutral-100 dark:border-neutral-700 max-w-[calc(100vw-2rem] lg:max-w-[calc(30vw-2rem)] lg:min-w-[500px]">
        <h1 className="text-xl font-semibold">Related Questions</h1>
        {data_reletedQuestions.map((question) => (
          <div
            key={question.id}
            className="p-4 border-b-[1px] border-neutral-100 dark:border-neutral-700"
          >
            <Link href={`/question/${question.id}/${question.slug}`}>
              <div className="flex items-center justify-start">
                <div className="mx-2 ml-0">
                  <CircleChevronRight className="w-4 h-4 bg-orange-500 rounded-full"  color="white"/>
                </div>
                <h1 className="text-[1rem]">{question.title}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSlugPage;
