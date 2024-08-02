"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { trpc } from '@/lib/trpc/client';
import { toast } from 'sonner';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  answerFile : z.instanceof(File).optional(),
  body : z.string().min(2, {
    message: "Explaination of your answer must be at least 2 characters.",
  })

});

interface SubmitAnswerProps {
  questionId: number;
}


const SubmitAnswerComponent:React.FC<SubmitAnswerProps> = ({ questionId }) => {
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         body: "",
       },
     });

     const {isSubmitting, errors} = form.formState;
     const {setError} = form;

     const router = useRouter();

     const updateQuestionUpdatedAt = trpc.protected.updadteQuestionUpdatedAtTrpc.useMutation({
       onSuccess: (data) => {
        //  console.log(data);
       },
       onError: (error) => {
        //  console.log(error);
       }
     });

     const submitAnswer = trpc.protected.createAnswerOfQuestionTrpc.useMutation({
       onSuccess: (data) => {
        //  console.log(data);
         form.reset();
         updateQuestionUpdatedAt.mutate(questionId);
         toast.success("Answer submitted successfully");
         router.refresh();
       },
       onError: (error) => {
        //  console.log(error);
       }
    });

     // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof formSchema>) {
       // Do something with the form values.
       // ✅ This will be type-safe and validated.
      //make a sleep function for 5 second 

    //    await new Promise((r) => setTimeout(r, 5000));

        const checkauth = await fetch("/api/checkauth");

        if (!checkauth.ok) {
          const error = await checkauth.clone().json();
          console.log(error.message);
          // throw new Error(JSON.stringify(error.message));
          // throw new Error("Upload failed");
          setError("answerFile", {message : error.message});
          return;
        }

        const user = await checkauth.json();
        // console.log(user);


       const file = values.answerFile!;
        if(file) {
               const formData = new FormData();

               formData.append("file", file);

               const response = await fetch("/api/upload", {
                 method: "POST",
                 body: formData,
               });

               if (!response.ok) {
                 const error = await response.clone().json();
                 console.log(error.message);
                 //  throw new Error(JSON.stringify(error.message));
                 // throw new Error("Upload failed");
                 setError("answerFile", { message: error.message });
               }
              //  console.log("Upload successful!");
               const json = await response.json();
              //  console.log(json);
               const data = {
                 questionId: questionId,
                 pdfLink: json.url,
                 pdfName: json.fileName,
                 body: values.body,
               };
               await submitAnswer.mutateAsync(data);
        }else {
          const data = {
            questionId: questionId,
            pdfLink: null,
            pdfName: null,
            body: values.body,
          };
          await submitAnswer.mutateAsync(data);
        }

    //    console.log(values, data);
     }

    //  const isSubmitting = form.formState.isSubmitting; 

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="answerFile"
            render={({ field : {value, onChange, ...field} }) => (
              <FormItem>
                <FormLabel>Upload Answer</FormLabel>
                <FormControl>
                  <Input
                    
                    {...field}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      onChange(e.target.files![0]);
                    }}
                    className="focus-visible:ring-0 dark:focus-visible:ring-1"
                  />
                </FormControl>
                <FormDescription>
                  Upload Your Written Answer of above question.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea
                    rows={12}
                    className="focus-visible:ring-0 dark:focus-visible:ring-1"
                    {...field}
                    placeholder="Remarks on your answer."
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Button type="submit" className='bg-tangerine-500 hover:bg-tangerine-600'>
              {isSubmitting ? (
                <>
                  <div className="flex space-x-2">
                    <h1>Submitting </h1>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                </>
              ) : (
                "Post Your Answer"
              )}
            </Button>
            <h1 className="text-sm text-neutral-500">
              By clicking “Post Your Answer”, you agree to our terms of service
              and acknowledge you have read our privacy policy.
            </h1>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SubmitAnswerComponent
