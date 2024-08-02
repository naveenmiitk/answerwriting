"use client";

import React, { useEffect } from "react";
import Select from "react-select";
import { Input } from "../ui/input";
import { trpc } from "@/lib/trpc/client";
import { getRelevantTags } from "@/lib/db/queries/query";
import { X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { FilterSelected } from "@/lib/utils";

type Tag = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}[];

const SelectTag = () => {
  const [input, setInput] = React.useState("");
  // const result = trpc.public.getRelevantTagsTrpc.useQuery(input);
  const [result, setResult] = React.useState<Tag>([]);
  const [selected, setSelected] = React.useState<Tag>([]);
  const [suggestedTag, setSuggestedTag] = React.useState<string>("");

  const dosomething = useDebouncedCallback(async () => {
    // console.log(input);
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
          (tag) => tag.name.toLowerCase() === suggestedTag.toLowerCase()
        )
      ) {
        setSuggestedTag(input);
        setInput("");
      }
    }
  };

  return (
    <div className="space-y-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="focus-visible:ring-0"
        placeholder="Search tags"
        // when press enter if input value excatly match a tag name then ads than tag to selected.
        // else create new tag
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (
              result.find(
                (tag) => tag.name.toLowerCase() === input.toLowerCase()
              )
            ) {
              if (
                !selected.find(
                  (tag) => tag.name.toLowerCase() === input.toLowerCase()
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
        <div>
          {suggestedTag.length > 0 && (
            <div className="bg-neutral-100 rounded-sm flex items-center justify-center p-2 hover:bg-stone-200/90 border-dashed border-[1px] border-neutral-400">
              <h1 className="">{suggestedTag} will be added after approval</h1>
              <X
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={() => {
                  setSuggestedTag("");
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 my-2">
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
    </div>
  );
};

export default SelectTag;
