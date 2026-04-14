"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.sessionsTable = (0, pg_core_1.pgTable)("sessions", {
    sid: (0, pg_core_1.varchar)("sid").primaryKey(),
    sess: (0, pg_core_1.jsonb)("sess").notNull(),
    expire: (0, pg_core_1.timestamp)("expire").notNull(),
}, function (table) { return [(0, pg_core_1.index)("IDX_session_expire").on(table.expire)]; });
