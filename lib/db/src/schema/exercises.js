"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertExerciseSchema = exports.exercisesTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var subjects_1 = require("./subjects");
var lessons_1 = require("./lessons");
exports.exercisesTable = (0, pg_core_1.pgTable)("exercises", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    lessonId: (0, pg_core_1.integer)("lesson_id").references(function () { return lessons_1.lessonsTable.id; }),
    subjectId: (0, pg_core_1.integer)("subject_id").notNull().references(function () { return subjects_1.subjectsTable.id; }),
    series: (0, pg_core_1.varchar)("series", { length: 5 }).notNull().default("ALL"),
    question: (0, pg_core_1.text)("question").notNull(),
    type: (0, pg_core_1.varchar)("type", { length: 20 }).notNull().default("mcq"),
    difficulty: (0, pg_core_1.varchar)("difficulty", { length: 10 }).notNull().default("medium"),
    options: (0, pg_core_1.json)("options").$type(),
    correctAnswer: (0, pg_core_1.text)("correct_answer").notNull(),
    explanation: (0, pg_core_1.text)("explanation").notNull(),
    isPremium: (0, pg_core_1.boolean)("is_premium").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
exports.insertExerciseSchema = (0, drizzle_zod_1.createInsertSchema)(exports.exercisesTable).omit({ id: true, createdAt: true });
