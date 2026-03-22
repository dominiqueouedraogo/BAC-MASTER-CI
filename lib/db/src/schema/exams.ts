import { pgTable, serial, text, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { subjectsTable } from "./subjects";

export const examsTable = pgTable("exams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subjectId: integer("subject_id").notNull().references(() => subjectsTable.id),
  series: varchar("series", { length: 5 }).notNull(),
  year: integer("year").notNull(),
  content: text("content").notNull(),
  correction: text("correction").notNull(),
  pdfUrl: text("pdf_url"),
  isPremium: boolean("is_premium").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertExamSchema = createInsertSchema(examsTable).omit({ id: true, createdAt: true });
export type InsertExam = z.infer<typeof insertExamSchema>;
export type Exam = typeof examsTable.$inferSelect;
