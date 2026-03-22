import { pgTable, serial, text, integer, boolean, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { subjectsTable } from "./subjects";
import { lessonsTable } from "./lessons";

export const exercisesTable = pgTable("exercises", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessonsTable.id),
  subjectId: integer("subject_id").notNull().references(() => subjectsTable.id),
  series: varchar("series", { length: 5 }).notNull().default("ALL"),
  question: text("question").notNull(),
  type: varchar("type", { length: 20 }).notNull().default("mcq"),
  difficulty: varchar("difficulty", { length: 10 }).notNull().default("medium"),
  options: json("options").$type<string[]>(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  isPremium: boolean("is_premium").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertExerciseSchema = createInsertSchema(exercisesTable).omit({ id: true, createdAt: true });
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Exercise = typeof exercisesTable.$inferSelect;
