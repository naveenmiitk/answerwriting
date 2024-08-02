"use client";

import React, { useEffect } from "react";
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
import { Textarea } from "../ui/textarea";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FilterSelected, generateSlug } from "@/lib/utils";
import { getRelevantTags } from "@/lib/db/queries/query";
import { X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Tag } from "@/lib/types";


const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(10, {
    message: "Body must be at least 10 characters.",
  }),
  tag: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    )
    .optional(),
});


const AskForumCombined = () => {
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState<Tag[]>([]);
    const [selected, setSelected] = React.useState<Tag[]>([]);
    const [suggestedTag, setSuggestedTag] = React.useState<string[]>([]);


    const dosomething = useDebouncedCallback(async () => {
    //   console.log(input);
      const response = await getRelevantTags(input);
      if (response) {
        const filterResponse = FilterSelected(response, selected);
        setResult(filterResponse);
      }
    }, 500);

    useEffect(() => {
      dosomething();
      return () => {
        setResult([]);
      };
    }, [dosomething, input]);

     const suggestNewTag = () => {
       if (input.length > 0) {
         if (
           !result.find(
             (tag) => tag.name.toLowerCase() === suggestedTag.find((tag) => tag.toLowerCase())
           )
         ) {
           setSuggestedTag([...suggestedTag, input]);
           setInput("");
         }
       }
     };



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
        // console.log(error);
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


     function onSubmit(values: z.infer<typeof formSchema>) {
       // Do something with the form values.
       // ✅ This will be type-safe and validated.
       //make slug from title
    //    console.log(values);
       const data = {
        title: values.title,
        body: values.body,
        slug: generateSlug(values.title),
        tag : selected.length > 0 ? selected : null,
        suggestedTag : suggestedTag.length > 0 ? suggestedTag : null, 
       };
    //    console.log(data);
       const result = createQuestion.mutate(data);
     }


  return (
    <div>
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
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search Tags"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    // {...field}
                    className="focus-visible:ring-0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (
                          result.find(
                            (tag) =>
                              tag.name.toLowerCase() === input.toLowerCase()
                          )
                        ) {
                          if (
                            !selected.find(
                              (tag) =>
                                tag.name.toLowerCase() === input.toLowerCase()
                            )
                          ) {
                            setSelected([
                              ...selected,
                              result.find((tag) => tag.name === input)!,
                            ]);

                            setInput("");
                            //remove that value from results
                            result.filter((tag) => tag.name !== input);
                          }
                        } else {
                          // setInput("");
                        }
                      }
                    }}
                    
                  />
                </FormControl>
                <FormDescription>Start Typing For Suggestion, Select Tags to Add. Maximum 5 Tags allowed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            {selected.map((tag) => (
              <div
                key={tag.id}
                className="bg-neutral-100 rounded-md flex items-center justify-center p-2 hover:bg-orange-100 max-w-fit"
              >
                <h1>{tag.name}</h1>
                <X
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={() => {
                    setResult([...result, tag]);
                    setSelected(selected.filter((t) => t.id !== tag.id));
                  }}
                />
              </div>
            ))}
            <div className="flex space-x-2">
              {suggestedTag.map((tag) => (
                <div
                  key={tag}
                  className="bg-neutral-100 rounded-md flex items-center justify-center p-2 hover:bg-orange-100 max-w-fit"
                >
                  <h1>{tag}</h1>
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => {
                      setSuggestedTag(suggestedTag.filter((t) => t !== tag));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 my-2 ">
            {result.length > 0 &&
              result.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-neutral-100 rounded-md flex items-center justify-center p-2 hover:bg-orange-100"
                  onClick={() => {
                    if (!selected.find((t) => t.id === tag.id)) {
                      setSelected([...selected, tag]);
                      setResult(result.filter((t) => t.id !== tag.id));
                      setInput("");
                    }
                  }}
                >
                  {tag.name}
                </div>
              ))}
            <div className="" onClick={suggestNewTag}>
              {!result.find(
                (tag) => tag.name.toLowerCase() === input.toLowerCase()
              ) &&
                input.length > 2 && (
                  <h1 className="bg-stone-200 rounded-sm flex items-center justify-center p-2 hover:bg-stone-200/90 cursor-pointer">
                    Suggest a new tag : {input}
                  </h1>
                )}
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default AskForumCombined
