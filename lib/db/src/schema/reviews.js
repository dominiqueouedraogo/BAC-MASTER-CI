"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertReviewSchema = exports.reviewsTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var users_1 = require("./users");
var lessons_1 = require("./lessons");
exports.reviewsTable = (0, pg_core_1.pgTable)("reviews", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    lessonId: (0, pg_core_1.integer)("lesson_id").notNull().references(function () { return lessons_1.lessonsTable.id; }),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(function () { return users_1.usersTable.id; }),
    rating: (0, pg_core_1.integer)("rating").notNull(),
    comment: (0, pg_core_1.text)("comment"),
    isApproved: (0, pg_core_1.boolean)("is_approved").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
exports.insertReviewSchema = (0, drizzle_zod_1.createInsertSchema)(exports.reviewsTable).omit({ id: true, createdAt: true });
