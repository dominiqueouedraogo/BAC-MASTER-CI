import { pgTable, serial, text, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"),
  replitId: text("replit_id").unique(),
  series: varchar("series", { length: 5 }).notNull().default("A"),
  role: varchar("role", { length: 20 }).notNull().default("student"),
  avatarUrl: text("avatar_url"),
  points: integer("points").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  isPremium: boolean("is_premium").notNull().default(false),
  lessonsPerDay: integer("lessons_per_day").notNull().default(3),
  exercisesPerDay: integer("exercises_per_day").notNull().default(5),
  studyMinutesPerDay: integer("study_minutes_per_day").notNull().default(60),
  lastActiveDate: text("last_active_date"),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
