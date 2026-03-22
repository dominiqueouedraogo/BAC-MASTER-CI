import { pgTable, serial, text, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { subjectsTable } from "./subjects";

export const lessonsTable = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subjectId: integer("subject_id").notNull().references(() => subjectsTable.id),
  series: varchar("series", { length: 5 }).notNull().default("ALL"),
  content: text("content").notNull(),
  summary: text("summary"),
  videoUrl: text("video_url"),
  audioUrl: text("audio_url"),
  pdfUrl: text("pdf_url"),
  isPremium: boolean("is_premium").notNull().default(false),
  duration: integer("duration"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertLessonSchema = createInsertSchema(lessonsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessonsTable.$inferSelect;
