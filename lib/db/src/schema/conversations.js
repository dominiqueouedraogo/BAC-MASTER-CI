"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertConversationSchema = exports.conversations = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
exports.conversations = (0, pg_core_1.pgTable)("conversations", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
});
exports.insertConversationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.conversations).omit({
    id: true,
    createdAt: true,
});
