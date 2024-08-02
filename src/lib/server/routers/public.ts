import {
  getAllQuestionsOfATag,
  getAllTagOfQuestion,
  getAnswersOfQuestion,
  getMostTagged,
  getNewQuestions,
  getQuestionById,
  getRecentQuestions,
  getRelatedQuestions,
  getRelevantTags,
  getTagIdFromSlug,
  getUserInfo,
  getVoteCountOfAnswer,
} from "@/lib/db/queries/query";
import { publicProcedure, router } from "@/lib/server/trpc";
import { z } from "zod";

export const publicRouter = router({
  getQuestionByIdTrpc: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const response = await getQuestionById(input);
      return response;
    }),

  getAnswersOfQuestionByIdTrpc: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const response = await getAnswersOfQuestion(input);
      return response;
    }),

  getAllTagOfQuestionByIdTrpc: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const response = await getAllTagOfQuestion(input);
      return response;
    }),

  getUserInfoTrpc: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ input }) => {
      return getUserInfo(input.userId);
    }),

  getVoteCountOfAnswerTrpc: publicProcedure
    .input(z.number())
    .query(({ input }) => {
      return getVoteCountOfAnswer(input);
    }),

  getRecentQuestionsTrpc: publicProcedure
    .input(
      z.object({ page: z.number().optional(), limit: z.number().optional() })
    )
    .query(async ({ input: { page, limit } }) => {
      const response = await getRecentQuestions();
      return response;
    }),

  getNewQuestionsTrpc: publicProcedure.query(async () => {
    const response = await getNewQuestions();
    return response;
  }),

  getRelevantTagsTrpc: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const response = await getRelevantTags(input);
      return response;
    }),

  getMostTaggedTrpc: publicProcedure.query(async () => {
    const response = await getMostTagged();
    return response;
  }),

  getAllQuestionsOfATagTRpc: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const response = await getAllQuestionsOfATag(input);
      return response;
    }),

  getTagIdFromSlugTrpc: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const response = await getTagIdFromSlug(input);
      return response;
    }),

  getRelatedQuestionsTrpc: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const response = await getRelatedQuestions(input);
      return response;
    }),
});
