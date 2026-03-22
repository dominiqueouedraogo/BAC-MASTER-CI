import { pgTable, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { lessonsTable } from "./lessons";
import { exercisesTable } from "./exercises";

export const lessonProgressTable = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  lessonId: integer("lesson_id").notNull().references(() => lessonsTable.id),
  completed: boolean("completed").notNull().default(true),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const exerciseProgressTable = pgTable("exercise_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercisesTable.id),
  correct: boolean("correct").notNull(),
  pointsEarned: integer("points_earned").notNull().default(0),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const insertLessonProgressSchema = createInsertSchema(lessonProgressTable).omit({ id: true, completedAt: true });
export type InsertLessonProgress = z.infer<typeof insertLessonProgressSchema>;
export type LessonProgress = typeof lessonProgressTable.$inferSelect;

export const insertExerciseProgressSchema = createInsertSchema(exerciseProgressTable).omit({ id: true, completedAt: true });
export type InsertExerciseProgress = z.infer<typeof insertExerciseProgressSchema>;
export type ExerciseProgress = typeof exerciseProgressTable.$inferSelect;
