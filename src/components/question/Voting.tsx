"use client";

import { trpc } from '@/lib/trpc/client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

interface VotingProps {
    answerId : number, 
    vote: number
}

const Voting:React.FC<VotingProps> = ({vote, answerId}) => {
    const [currentVote, setCurrentVote] = React.useState(vote);
    const router = useRouter();


    const increaseVote = trpc.protected.increaseVoteCountTrpc.useMutation({
    onSuccess: (data) => {
        // console.log(data);
        router.refresh();
    },
    onError: (error) => {
        console.log(error);
    },
    });
    const decreaseVote = trpc.protected.decreaseVoteCountTrpc.useMutation({
    onSuccess: (data) => {
        // console.log(data);
    },
    onError: (error) => {
        console.log(error);
    },
    });

    const updateVote = trpc.protected.createVoteOnAnswerTrpc.useMutation({
        onSuccess: (data) => {
            // console.log(data);
            if(data[0].vote === "UPVOTE"){
                setCurrentVote(currentVote + 1);
                increaseVote.mutate(answerId);
            }else if(data[0].vote === "DOWNVOTE"){
                setCurrentVote(currentVote - 1);
                decreaseVote.mutate(answerId);
            }
            toast.success("Voted successfully");
            router.refresh();
        },
        onError: (error) => {
            // console.log(error);
            if(error.data?.code === "UNAUTHORIZED"){
                toast.error("Please login to vote");
            }else if(error.shape?.message === `duplicate key value violates unique constraint "uniqueIdx"`){
                toast.error("Already voted");
            }else {
              toast.error(error.message);
            }
            
        }
    });

   

    const handleUpvote = () => {
        // setCurrentVote(currentVote + 1);
        updateVote.mutate({answerId: answerId, vote: "UPVOTE"});
        // increaseVote.mutate(answerId);
    };
    const handleDownvote = () => {
        // setCurrentVote(currentVote - 1);
        updateVote.mutate({answerId: answerId, vote: "DOWNVOTE"});
        // decreaseVote.mutate(answerId);
    };
  return (
    <div className="flex flex-col space-y-2 items-center justify-start">
      <ChevronUp
        className="h-10 w-10 border-[1px] border-neutral-500 rounded-full hover:bg-orange-100 p-2 dark:hover:text-black"
        onClick={handleUpvote}
      />
      <h1 className="text-xl font-semibold text-black dark:text-white">
        {currentVote || 0}
      </h1>
      <ChevronDown
        className="h-10 w-10 border-[1px] border-neutral-500 rounded-full hover:bg-orange-100 p-2 dark:hover:text-black"
        onClick={handleDownvote}
      />
    </div>
  );
}

export default Voting
