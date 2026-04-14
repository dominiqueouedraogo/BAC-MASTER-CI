"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserBadgeSchema = exports.insertBadgeSchema = exports.userBadgesTable = exports.badgesTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var users_1 = require("./users");
exports.badgesTable = (0, pg_core_1.pgTable)("badges", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    icon: (0, pg_core_1.text)("icon").notNull(),
    requirement: (0, pg_core_1.text)("requirement").notNull(),
    pointsRequired: (0, pg_core_1.integer)("points_required").notNull().default(0),
});
exports.userBadgesTable = (0, pg_core_1.pgTable)("user_badges", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(function () { return users_1.usersTable.id; }),
    badgeId: (0, pg_core_1.integer)("badge_id").notNull().references(function () { return exports.badgesTable.id; }),
    earnedAt: (0, pg_core_1.timestamp)("earned_at").notNull().defaultNow(),
});
exports.insertBadgeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.badgesTable).omit({ id: true });
exports.insertUserBadgeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userBadgesTable).omit({ id: true, earnedAt: true });
