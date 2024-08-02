"use server";

import { and, count, desc, eq, ilike, like, sql } from "drizzle-orm";
import { db } from "../index";
import {
  answers,
  questionTag,
  questions,
  suggestedTag,
  tag,
  userAnswerVote,
  users,
} from "../schema/auth";

export const getUserInfo = async (userId: string) => {
  const response = await db.select().from(users).where(eq(users.id, userId));
  return response;
};

export const getQuestionById = async (questionId: number) => {
  const response = await db
    .select()
    .from(questions)
    .where(eq(questions.id, questionId));
  return response;
};

export const createQuestion = async (data: any) => {
  const response = await db.insert(questions).values(data).returning();
  return response;
};

export const createAnswerOfQuestion = async (data: any) => {
  const response = await db.insert(answers).values(data).returning();
  return response;
};

export const createVoteOnAnswer = async (data: any) => {
  const response = await db.insert(userAnswerVote).values(data).returning();
  return response;
};

export const getAnswersOfQuestion = async (questionId: number) => {
  const response = await db
    .select({
      id: answers.id,
      body: answers.body,
      pdfName: answers.pdfName,
      pdfLink: answers.pdfLink,
      vote: answers.vote,
      createdAt: answers.createdAt,
      userName: users.name,
      userPhoto: users.image,
    })
    .from(answers)
    .where(eq(answers.questionId, questionId))
    .leftJoin(users, eq(users.id, answers.userId))
    .orderBy(desc(answers.vote));
  return response;
};

export const increaseVoteCount = async (answerId: number) => {
  const answer = await db
    .select({ vote: answers.vote })
    .from(answers)
    .where(eq(answers.id, answerId));

  const response = await db
    .update(answers)
    .set({ vote: answer[0].vote + 1 })
    .where(eq(answers.id, answerId));
  return response;
};

export const decreaseVoteCount = async (answerId: number) => {
  const answer = await db
    .select({ vote: answers.vote })
    .from(answers)
    .where(eq(answers.id, answerId));
  const response = await db
    .update(answers)
    .set({ vote: answer[0].vote - 1 })
    .where(eq(answers.id, answerId));
  return response;
};

export const getAllTagOfQuestion = async (questionId: number) => {
  const response = await db
    .select({
      name: tag.name,
      slug: tag.slug,
    })
    .from(questionTag)
    .where(eq(questionTag.questionId, questionId))
    .leftJoin(tag, eq(tag.id, questionTag.tagId))
    .orderBy(tag.createdAt)
    .groupBy(tag.id);
  return response;
};

export const getVoteCountOfAnswer = async (answerId: number) => {
  const upvote = await db
    .select({ count: count() })
    .from(userAnswerVote)
    .where(
      and(
        eq(userAnswerVote.answerId, answerId),
        eq(userAnswerVote.vote, "UPVOTE")
      )
    );
  const downvote = await db
    .select({ count: count() })
    .from(userAnswerVote)
    .where(
      and(
        eq(userAnswerVote.answerId, answerId),
        eq(userAnswerVote.vote, "DOWNVOTE")
      )
    );

  return { vote: upvote[0].count - downvote[0].count };
};

//join question table with answers table and find numbers of answers to a particular question.

export const getRecentQuestions = async () => {
  // const lim = limit ? limit : 20;
  // const offset = pageNo ? pageNo * lim : 0;
  const response = await db
    .select({
      id: questions.id,
      // body : questions.body,
      title: questions.title,
      vote: questions.vote,
      slug: questions.slug,
      createdAt: questions.createdAt,
      updatedAt: questions.updatedAt,
      answerCount: count(answers.id).as("answerCount"),
    })
    .from(questions)
    .leftJoin(answers, eq(answers.questionId, questions.id))
    .groupBy(questions.id)
    .orderBy(desc(questions.createdAt))
    // .limit(lim)
    // .offset(offset);
  return response;

  //also get tag associated with each question
};

export const getNewQuestions = async () => {
  const response = await db.query.questions.findMany({
    with: {
      answers: true,
      tags: true,
    },
    orderBy: [desc(questions.createdAt)],
    limit: 15,
  });
  return response;
};

export const getAllQuestions = async () => {
  const response = await db
    .select({
      id: questions.id,
      slug: questions.slug,
      createdAt: questions.createdAt,
    })
    .from(questions)
    .orderBy(desc(questions.createdAt));
  return response;
};

export const updadteQuestionUpdatedAt = async (questionId: number) => {
  const response = await db
    .update(questions)
    .set({ updatedAt: new Date() })
    .where(eq(questions.id, questionId));
  return response;
};

// search relevant tag with input string
export const getRelevantQuestions = async (input: string) => {
  if (!input) return null;

  const sanitizedInput = input.replace(/[^a-zA-Z0-9\s]/g, "").trim();

  if (!sanitizedInput) return null;

  const tsQuery = input
    .split(/\s+/) // .map((word) => `${word}:*`) // Using the wildcard character for prefix matching
    .join(" | ");

  // console.log("tsQuery", tsQuery);

  const response = await db
    .select()
    .from(questions)
    .where(
      sql`to_tsvector('english', ${questions.title}) @@ websearch_to_tsquery('english', ${tsQuery})`
    );
  return response;
};

export const getRelevantTags = async (input: string) => {
  if (!input) return null;
  const search = input.toLowerCase();
  const response = await db
    .select()
    .from(tag)
    .where(ilike(tag.name, `%${search}%`));
  return response;
};

export const createTagsOfQuestion = async (data: any) => {
  const response = await db.insert(questionTag).values(data).returning();
  return response;
};

export const createSuggestedTagOfQuestion = async (data: any) => {
  const response = await db.insert(suggestedTag).values(data).returning();
  return response;
};

export const getMostTagged = async () => {
  const response = await db
    .select({
      name: tag.name,
      slug: tag.slug,
      count: count().as("count"),
    })
    .from(questionTag)
    .leftJoin(tag, eq(tag.id, questionTag.tagId))
    .groupBy(tag.id)
    .orderBy(desc(count().as("count")))
    .limit(5);
  return response;
};

//fetch all questions of a particular tag

export const getAllQuestionsOfATag = async (tagId: number) => {
  const response = await db
    .select({
      id: questions.id,
      title: questions.title,
      // body: questions.body,
      slug: questions.slug,
      createdAt: questions.createdAt,
      updatedAt: questions.updatedAt,
      vote: questions.vote,
    })
    .from(questionTag)
    .where(eq(questionTag.tagId, tagId))
    .leftJoin(questions, eq(questions.id, questionTag.questionId));
  return response;
};

// get Tag slug to tag id;

export const getTagIdFromSlug = async (slug: string) => {
  const response = await db
    .select({ id: tag.id, name: tag.name })
    .from(tag)
    .where(eq(tag.slug, slug));
  return response;
};

// generate Bluk tags;
export const createBulkTags = async (data: any) => {
  const response = await db.insert(tag).values(data).onConflictDoNothing();
  return response;
};

export const getRelatedQuestions = async (questionId: number) => {
  // const res = await getQuestionById(questionId);
  // const slug = res[0].slug
  //   .replace(/-/g, " ")
  //   .replace(/[^a-zA-Z0-9\s]/g, "")
  //   .trim();
  // //replace "-" with " " in slug
  // console.log("slug", slug);
  // const res2 = await getRelevantQuestions(slug);
  // console.log(
  //   "res2",
  //   res2?.map((item) => item.slug)
  // );
  // if (!res2 || res2.length < 5) {
  //   const res3 = await getAllTagOfQuestion(questionId);
  //   const tagSlug = res3.map(
  //     (item) =>
  //       item.name
  //         ?.toString()
  //         .toLowerCase()
  //         .replace(/[^\w\s]/g, "")
  //         .replace(/\d/g, "") || ""
  //   );
  //   const input = tagSlug.join(" ");
  //   console.log(input);
  //   const res4 = await getRelevantQuestions(input);
  //   const safe_res4 = res4 || [];
  //   const safe_res2 = res2 || [];
  //   console.log(
  //     "saferes2",
  //     safe_res2.map((item) => item.title),
  //     "saferes4",
  //     safe_res4.map((item) => item.title)
  //   );
  //   return [...new Set([...safe_res2, ...safe_res4])];
  // }
  // return res2;

  const data_tag = await db.select({
    id : tag.id, 
  }).from(questionTag).where(eq(questionTag.questionId, questionId)).leftJoin(tag, eq(tag.id, questionTag.tagId));
  if(!data_tag || !data_tag.length) return [];
  const data = await db.select({
    id : questions.id,
    title : questions.title,
    slug : questions.slug,
  }).from(questionTag)
    .where(eq(questionTag.tagId, data_tag[0].id!))
    .leftJoin(questions, eq(questions.id, questionTag.questionId)).orderBy(desc(questions.createdAt));
  //remove above questionId from data;

  const filter_data = data.filter((item) => item.id !== questionId);
  return filter_data;
};
