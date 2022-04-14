"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbPool = void 0;
const pg_1 = require("pg");
let pool;
const getDbPool = () => {
    if (!pool) {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL not set");
        }
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    }
    return pool;
};
exports.getDbPool = getDbPool;
//# sourceMappingURL=db_pool.js.map