CREATE TABLE IF NOT EXISTS "questionAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"questionId" integer NOT NULL,
	"answerId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer" ALTER COLUMN "vote" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "answer" ADD COLUMN "pdfLink" text;--> statement-breakpoint
ALTER TABLE "questionTag" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionAnswer" ADD CONSTRAINT "questionAnswer_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionAnswer" ADD CONSTRAINT "questionAnswer_answerId_answer_id_fk" FOREIGN KEY ("answerId") REFERENCES "public"."answer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
