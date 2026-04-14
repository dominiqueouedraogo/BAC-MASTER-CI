"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertLessonSchema = exports.lessonsTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var subjects_1 = require("./subjects");
exports.lessonsTable = (0, pg_core_1.pgTable)("lessons", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    subjectId: (0, pg_core_1.integer)("subject_id").notNull().references(function () { return subjects_1.subjectsTable.id; }),
    series: (0, pg_core_1.varchar)("series", { length: 5 }).notNull().default("ALL"),
    content: (0, pg_core_1.text)("content").notNull(),
    summary: (0, pg_core_1.text)("summary"),
    videoUrl: (0, pg_core_1.text)("video_url"),
    audioUrl: (0, pg_core_1.text)("audio_url"),
    pdfUrl: (0, pg_core_1.text)("pdf_url"),
    isPremium: (0, pg_core_1.boolean)("is_premium").notNull().default(false),
    duration: (0, pg_core_1.integer)("duration"),
    order: (0, pg_core_1.integer)("order").notNull().default(0),
    keyPoints: (0, pg_core_1.text)("key_points"),
    examples: (0, pg_core_1.text)("examples"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.insertLessonSchema = (0, drizzle_zod_1.createInsertSchema)(exports.lessonsTable).omit({ id: true, createdAt: true, updatedAt: true });
