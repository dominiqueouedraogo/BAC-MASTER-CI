"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertExamSchema = exports.examsTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var subjects_1 = require("./subjects");
exports.examsTable = (0, pg_core_1.pgTable)("exams", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    subjectId: (0, pg_core_1.integer)("subject_id").notNull().references(function () { return subjects_1.subjectsTable.id; }),
    series: (0, pg_core_1.varchar)("series", { length: 5 }).notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    correction: (0, pg_core_1.text)("correction").notNull(),
    pdfUrl: (0, pg_core_1.text)("pdf_url"),
    isPremium: (0, pg_core_1.boolean)("is_premium").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
exports.insertExamSchema = (0, drizzle_zod_1.createInsertSchema)(exports.examsTable).omit({ id: true, createdAt: true });
