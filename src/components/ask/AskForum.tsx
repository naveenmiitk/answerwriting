"use client";

import React, { useEffect } from 'react'
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
import { Textarea } from '../ui/textarea';
import { trpc } from '@/lib/trpc/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/lib/utils';
import Select from "react-select";
import { tag } from '@/lib/db/schema/auth';
import makeAnimated from "react-select/animated";
import SelectTag from './SelectTag';


const options = [
  { value: "GS1", label: "GS1" },
  { value: "GS2", label: "GS2" },
  { value: "GS3", label: "GS3" },
  { value: "GS4", label: "GS4" },
  { value: "AnthropologyP1", label: "Anthropology P1" },
  { value: "AnthropologyP2", label: "Anthropology P2" },
  { value: "EconomyP1", label: "Economy P1" },
  { value: "EconomyP2", label: "Economy P2" },
  { value: "GeographyP1", label: "Geography P1" },
  { value: "GeographyP2", label: "Geography P2" },
  { value: "PSIRP1", label: "PSIR P1" },
  { value: "PSIRP2", label: "PSIR P2"},
];

const animatedComponents = makeAnimated();

const formSchema = z.object({
  title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
  }), 
  body: z.string().min(10, {
      message: "Body must be at least 10 characters.",
  }),
  tag: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

type Tag = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}[];


const AskForum = () => {
  const [selectTag, setSelectTag] = React.useState<Tag>([]);




     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         title: "",
         body: "",
       },
     });

     const router = useRouter();

     const createQuestion = trpc.protected.createQuestionTrpc.useMutation({
       onSuccess: (data, variables, context) => {
        toast.success("Question created successfully");
        form.reset();
        router.replace(`/question/${data[0].id}/${data[0].slug}`);
       },
       onError: (error, variables, context) => {
        //  console.log(error);
         if (error.data?.code === "UNAUTHORIZED") {
           toast.error("Please login to ask a question");
         } else if (
           error.shape?.message ===
           `duplicate key value violates unique constraint "question_slug_unique"`
         ) {
           toast.error("Question already exists");
         } else {
           toast.error("Failed to create question");
         }
     },
     });

     // 2. Define a submit handler.
     function onSubmit(values: z.infer<typeof formSchema>) {
       // Do something with the form values.
       // ✅ This will be type-safe and validated.
       //make slug from title
      //  console.log(values);
       const data = {
        title : values.title,
        body : values.body,
        slug : generateSlug(values.title),
        // tag : values.tag
       }
      //  console.log(data);
      //  const result = createQuestion.mutate(data);
     }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="focus-visible:ring-0"
                />
              </FormControl>
              <FormDescription>Enter your Question here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Body"
                  {...field}
                  rows={12}
                  className="focus-visible:ring-0"
                />
              </FormControl>
              <FormDescription>
                Explain your Questions in detail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                {/* <Input
                  placeholder="GS1"
                  {...field}
                  className="focus-visible:ring-0"
                /> */}
                {/* <Select
                  options={options}
                  isMulti
                  {...field}
                  className="focus-visible:ring-0"
                  maxMenuHeight={500}
                  menuShouldScrollIntoView
                  pageSize={5}
                  escapeClearsValue
                  classNames={{
                    control: () => "w-full",
                    menu: () => "w-1/3",
                  }}
                /> */}
                <SelectTag />
              </FormControl>
              <FormDescription>
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AskForum
