import React from "react";
import { MetadataRoute } from "next";
import { getAllQuestions } from "@/lib/db/queries/query";
import moment from "moment";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const questions = await getAllQuestions();

  const questionSiteMap: MetadataRoute.Sitemap = questions.map((item) => ({
    url: `${base}/question/${item.id}/${item.slug}`,
    priority: 0.9,
    lastModified: moment(item.createdAt).format("YYYY-MM-DD"),
    changeFrequency: "weekly",
  }));


  return [
    {
      url: `${base}/`,
      priority: 1,
    },
    {
      url: `${base}/explore`,
      priority: 1,
    },
    {
      url: `${base}/questions`,
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      priority: 1,
    },
    {
      url: `${base}/terms`,
      priority: 1,
    },
    {
      url: `${base}/tags`,
      priority: 1,
    },
    {
      url: `${base}/question/ask`,
      priority: 1,
    },
    {
      url: `${base}/contact-us`,
      priority: 1,
    },
    {
      url: `${base}/about`,
      priority: 1,
    },
    ...questionSiteMap,
  ];
}
