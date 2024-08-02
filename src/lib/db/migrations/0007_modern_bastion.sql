DO $$ BEGIN
 CREATE TYPE "public"."vote" AS ENUM('UPVOTE', 'DOWNVOTE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAnswerVote" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"answerId" integer NOT NULL,
	"vote" "vote" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userQuestionVote" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"questionId" integer NOT NULL,
	"vote" "vote" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "vote" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAnswerVote" ADD CONSTRAINT "userAnswerVote_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAnswerVote" ADD CONSTRAINT "userAnswerVote_answerId_answer_id_fk" FOREIGN KEY ("answerId") REFERENCES "public"."answer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userQuestionVote" ADD CONSTRAINT "userQuestionVote_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userQuestionVote" ADD CONSTRAINT "userQuestionVote_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
