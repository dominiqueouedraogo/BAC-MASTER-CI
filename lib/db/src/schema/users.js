"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserSchema = exports.usersTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    passwordHash: (0, pg_core_1.text)("password_hash"),
    replitId: (0, pg_core_1.text)("replit_id").unique(),
    series: (0, pg_core_1.varchar)("series", { length: 5 }).notNull().default("A"),
    role: (0, pg_core_1.varchar)("role", { length: 20 }).notNull().default("student"),
    avatarUrl: (0, pg_core_1.text)("avatar_url"),
    points: (0, pg_core_1.integer)("points").notNull().default(0),
    streak: (0, pg_core_1.integer)("streak").notNull().default(0),
    isPremium: (0, pg_core_1.boolean)("is_premium").notNull().default(false),
    lessonsPerDay: (0, pg_core_1.integer)("lessons_per_day").notNull().default(3),
    exercisesPerDay: (0, pg_core_1.integer)("exercises_per_day").notNull().default(5),
    studyMinutesPerDay: (0, pg_core_1.integer)("study_minutes_per_day").notNull().default(60),
    lastActiveDate: (0, pg_core_1.text)("last_active_date"),
    resetToken: (0, pg_core_1.text)("reset_token"),
    resetTokenExpiry: (0, pg_core_1.timestamp)("reset_token_expiry"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.usersTable).omit({ id: true, createdAt: true, updatedAt: true });
