"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSubjectSchema = exports.subjectsTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
exports.subjectsTable = (0, pg_core_1.pgTable)("subjects", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    series: (0, pg_core_1.varchar)("series", { length: 5 }).notNull().default("ALL"),
    description: (0, pg_core_1.text)("description"),
    icon: (0, pg_core_1.text)("icon"),
    color: (0, pg_core_1.text)("color"),
    order: (0, pg_core_1.integer)("order").notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
exports.insertSubjectSchema = (0, drizzle_zod_1.createInsertSchema)(exports.subjectsTable).omit({ id: true, createdAt: true });
