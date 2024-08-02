ALTER TABLE "answer" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "updatedAt" SET DEFAULT now();