import {
  createAnswerOfQuestion,
  createQuestion,
  createSuggestedTagOfQuestion,
  createTagsOfQuestion,
  createVoteOnAnswer,
  decreaseVoteCount,
  getUserInfo,
  increaseVoteCount,
  updadteQuestionUpdatedAt,
} from "@/lib/db/queries/query";
import { questionTag, voteEnum } from "@/lib/db/schema/auth";
import { publicProcedure, router, protectedProcedure } from "@/lib/server/trpc";
import { z } from "zod";

export const protectedRouter = router({
  createQuestionTrpc: protectedProcedure
    .input(
      z
        .object({
          title: z.string(),
          body: z.string(),
          slug: z.string(),
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
            .optional().nullish(),
          suggestedTag: z.array(z.string()).optional().nullish(),
        })
        .refine((data) => data.title.length > 0 && data.body.length > 0, {
          message: "Title and body are required",
        })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log('input:', input)
      const { id } = ctx.session.user;
      const data = {
        userId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...input,
      };
      const response = await createQuestion(data);
      const { id: questionId } = response[0];
      if (input.tag) {
        const taglist = input.tag.map((tag) => {
          return { questionId: questionId, tagId: tag.id };
        });
        const response2 = await createTagsOfQuestion(taglist);


        if (input.suggestedTag) {
          const taglist = input.suggestedTag.map((tag) => {
            return { questionId: questionId, name: tag, userId: id };
          });
          const response3 = await createSuggestedTagOfQuestion(taglist);
          return [{ ...response[0], tag: response2, suggestedTag: response3 }];
        }else{
          return [{ ...response[0], tag: response2 }];
        }

      }else{
        if (input.suggestedTag) {
          const taglist = input.suggestedTag.map((tag) => {
            return { questionId: questionId, name: tag, userId: id };
          });
          const response3 = await createSuggestedTagOfQuestion(taglist);
          return [{ ...response[0], suggestedTag: response3 }];
        }else{
          return response;
        }
      }
  
      return response;
    }),

  createAnswerOfQuestionTrpc: protectedProcedure
    .input(
      z
        .object({
          body: z.string(),
          questionId: z.number(),
          pdfLink: z.string().optional().nullable(),
          pdfName: z.string().optional().nullable(),
        })
        .refine((data) => data.body.length > 0, {
          message: "Body is required",
        })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log('input:', input)
      const { id } = ctx.session.user;
      const data = {
        userId: id,
        ...input,
      };
      const response = await createAnswerOfQuestion(data);
      return response;
    }),

  createVoteOnAnswerTrpc: protectedProcedure
    .input(
      z.object({
        answerId: z.number(),
        vote: z.enum(["UPVOTE", "DOWNVOTE"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const data = {
        userId: id,
        ...input,
      };
      const response = await createVoteOnAnswer(data);
      return response;
    }),

  increaseVoteCountTrpc: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const response = await increaseVoteCount(input);
      return response;
    }),

  decreaseVoteCountTrpc: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const response = await decreaseVoteCount(input);
      return response;
    }),

  updadteQuestionUpdatedAtTrpc: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const response = await updadteQuestionUpdatedAt(input);
      return response;
    }),
});
