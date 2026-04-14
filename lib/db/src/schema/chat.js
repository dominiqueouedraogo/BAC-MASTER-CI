"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertChatMessageSchema = exports.chatMessagesTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var users_1 = require("./users");
exports.chatMessagesTable = (0, pg_core_1.pgTable)("chat_messages", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(function () { return users_1.usersTable.id; }),
    role: (0, pg_core_1.varchar)("role", { length: 20 }).notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
exports.insertChatMessageSchema = (0, drizzle_zod_1.createInsertSchema)(exports.chatMessagesTable).omit({ id: true, createdAt: true });
