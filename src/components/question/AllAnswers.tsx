import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Voting from './Voting';
import { api } from '@/lib/trpc/api';

interface AllAnswersProps {
  questionId: number;
  data_answers: {
    id: number;
    body: string;
    pdfName: string | null;
    pdfLink: string | null;
    vote: number;
    createdAt: Date;
    userName: string | null;
    userPhoto: string | null;
  }[];
}
const AllAnswers: React.FC<AllAnswersProps> = ({ questionId, data_answers }) => {

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{data_answers.length} Answers</h1>
      {data_answers.map(async (answer, index) => {
        // console.log(answer.vote);
        const vote = await api.public.getVoteCountOfAnswerTrpc.query(answer.id);
        // console.log('vote:', vote);
        return (
          <div
            key={answer.id}
            className="flex p-4 border-b-[1px] border-neutral-200 mr-[1rem] space-x-4"
          >
            <Voting vote={vote.vote} answerId={answer.id}/>
            <div className="flex-1 ml-[1rem]">
              <div className="flex space-x-4 items-center">
                <Avatar>
                  <AvatarImage src={answer.userPhoto || ""} />
                  <AvatarFallback>{answer.userName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1>{answer.userName}</h1>
                  <h1 className="text-neutral-500 dark:text-neutral-200 text-sm">
                    Posted on {answer.createdAt.toLocaleDateString()}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-[2rem] space-y-[1rem] border-b-[0px] border-neutral-200 pb-[2rem] ">
                <div className="lg:max-w-[80%] mx-0 flex-1">
                  <h1 className="text-normal whitespace-pre-line">
                    {answer.body}
                  </h1>
                  {answer.pdfLink && (
                    <Link href={answer.pdfLink} target="_blank">
                      <h1 className="text-tangerine-500 font-semibold">
                        {answer.pdfName}
                      </h1>
                    </Link>
                  )}
                </div>

                {/* <Button className="bg-blue-500 hover:bg-blue-500/90 max-w-fit" asChild>
              <Link href={`/question/ask`}>Ask Question</Link>
            </Button> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllAnswers
