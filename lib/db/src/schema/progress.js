"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertExerciseProgressSchema = exports.insertLessonProgressSchema = exports.exerciseProgressTable = exports.lessonProgressTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var users_1 = require("./users");
var lessons_1 = require("./lessons");
var exercises_1 = require("./exercises");
exports.lessonProgressTable = (0, pg_core_1.pgTable)("lesson_progress", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(function () { return users_1.usersTable.id; }),
    lessonId: (0, pg_core_1.integer)("lesson_id").notNull().references(function () { return lessons_1.lessonsTable.id; }),
    completed: (0, pg_core_1.boolean)("completed").notNull().default(true),
    completedAt: (0, pg_core_1.timestamp)("completed_at").notNull().defaultNow(),
});
exports.exerciseProgressTable = (0, pg_core_1.pgTable)("exercise_progress", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(function () { return users_1.usersTable.id; }),
    exerciseId: (0, pg_core_1.integer)("exercise_id").notNull().references(function () { return exercises_1.exercisesTable.id; }),
    correct: (0, pg_core_1.boolean)("correct").notNull(),
    pointsEarned: (0, pg_core_1.integer)("points_earned").notNull().default(0),
    completedAt: (0, pg_core_1.timestamp)("completed_at").notNull().defaultNow(),
});
exports.insertLessonProgressSchema = (0, drizzle_zod_1.createInsertSchema)(exports.lessonProgressTable).omit({ id: true, completedAt: true });
exports.insertExerciseProgressSchema = (0, drizzle_zod_1.createInsertSchema)(exports.exerciseProgressTable).omit({ id: true, completedAt: true });
