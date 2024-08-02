import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
// import postgres from "postgres";
// import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccount } from "next-auth/adapters";
import { relations, sql } from "drizzle-orm";

// const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle";
// const pool = postgres(connectionString, { max: 1 });

// export const db = drizzle(pool);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);


export const questions = pgTable("question", {
  id: serial("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  body: text("body").notNull(),
  slug: text("slug").notNull().unique(),
  vote: integer("vote").notNull().default(0),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
}, 
(question) => ({
  searchIndex : index("question_search_index").using("gin", sql`(setweight(to_tsvector('english', ${question.title}), 'A') || setweight(to_tsvector('english', ${question.body}), 'B'))`), 
})
);

export const answers = pgTable(
  "answer",
  {
    id: serial("id").notNull().primaryKey(),
    body: text("body").notNull(),
    userId: text("userId").notNull().references(() => users.id),
    pdfName: text("pdfName"),
    pdfLink: text("pdfLink"),
    vote : integer("vote").notNull().default(0),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
    questionId: integer("questionId")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
  } 
);

export const questionAnswers = pgTable("questionAnswer", {
  id: serial("id").notNull().primaryKey(),
  questionId: integer("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  answerId: integer("answerId")
    .notNull()
    .references(() => answers.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const tag = pgTable(
  "tag",
  {
    id: serial("id").notNull().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  }, 
  (tag) => ({
    searchIndex: index("searchIndex").using("gin", sql`(setweight(to_tsvector('english', ${tag.name}), 'A') || setweight(to_tsvector('english', ${tag.slug}), 'B'))`),
  })
);

export const suggestedTag = pgTable("suggestedTag", {
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
  questionId : integer("questionId").notNull().references(() => questions.id, { onDelete: "cascade" }),
  userId : text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});


export const questionTag = pgTable("questionTag", {
  id: serial("id").notNull().primaryKey(),
  questionId: integer("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  tagId: integer("tagId")
    .notNull()
    .references(() => tag.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

//make enum for voting on answer, it can be upvote or downvote or no vote

export const voteEnum = pgEnum("vote", ["UPVOTE", "DOWNVOTE"]);

export const userAnswerVote = pgTable("userAnswerVote", {
  id: serial("id").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  answerId: integer("answerId")
    .notNull()
    .references(() => answers.id, { onDelete: "cascade" }),
  vote: voteEnum("vote").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
}, 
  (t) => ({
    uniqueIdx: uniqueIndex("uniqueIdx").on(t.userId, t.answerId),
  }));

export const userQuestionVote = pgTable("userQuestionVote", {
  id: serial("id").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  questionId: integer("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  vote: voteEnum("vote").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});


//relations 

export const usersRelations = relations(users, ({one, many}) => ({
  questions: many(questions),
  answers: many(answers),
  // questionVotes: many(userQuestionVote),
  // answerVotes: many(userAnswerVote),
  // suggestedTags: many(suggestedTag),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  answers: many(answers),
  user: one(users, {
    fields: [questions.userId],
    references: [users.id],
  }),
  tags: many(questionTag),
  // questionVotes: many(userQuestionVote),
}));


export const answersRelations = relations(answers, ({one, many}) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  user: one(users, {
    fields: [answers.userId],
    references: [users.id],
  }),
  // answerVotes: many(userAnswerVote),
}));

export const questionAnswersRelations = relations(questionAnswers, ({one}) => ({
  question: one(questions, {
    fields: [questionAnswers.questionId],
    references: [questions.id],
  }),
  answer: one(answers, {
    fields: [questionAnswers.answerId],
    references: [answers.id],
  }),
}));

export const tagsRelations = relations(tag, ({many}) => ({
  questionTags: many(questionTag),
}));


export const questionTagRelations = relations(questionTag, ({one}) => ({
  question: one(questions, {
    fields: [questionTag.questionId],
    references: [questions.id],
  }), 
  tag: one(tag, {
    fields: [questionTag.tagId],
    references: [tag.id],
  }),
}));