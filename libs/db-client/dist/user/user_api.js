"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApi = void 0;
const db = __importStar(require("zapatos/db"));
const db_pool_1 = require("../db/db_pool");
const user_adapters_1 = require("./user_adapters");
const createUser = async (user) => {
    await db.insert("users", (0, user_adapters_1.userWithPasswordToUserDb)(user)).run((0, db_pool_1.getDbPool)());
};
const createUserValidationEmailData = async ({ emailData, userId, }) => {
    await db
        .insert("user_validation_emails", [
        {
            key: emailData.key,
            // TODO: validate
            sent_at: emailData.sentAt,
            user_id: userId,
        },
    ])
        .run((0, db_pool_1.getDbPool)());
};
const deleteUserValidationEmailData = async (userId) => {
    await db
        .deletes("user_validation_emails", { user_id: userId })
        .run((0, db_pool_1.getDbPool)());
};
const getUserByEmail = async (email) => {
    const user = await db.selectOne("users", { email }).run((0, db_pool_1.getDbPool)());
    return user ? (0, user_adapters_1.userDbToUserWithPassword)(user) : undefined;
};
const getUserById = async (id) => {
    const user = await db.selectOne("users", { id }).run((0, db_pool_1.getDbPool)());
    return user ? (0, user_adapters_1.userDbToUserWithPassword)(user) : undefined;
};
const getUserValidationEmailDataByKey = async (key) => {
    const emailData = await db
        .selectOne("user_validation_emails", { key }, {
        lateral: {
            user: db.selectOne("users", {
                id: db.parent("user_id"),
            }),
        },
    })
        .run((0, db_pool_1.getDbPool)());
    return emailData && emailData.user
        ? {
            ...(0, user_adapters_1.userValidationDbToUserValidationEmailData)(emailData),
            user: (0, user_adapters_1.userDbToUserWithPassword)(emailData.user),
        }
        : undefined;
};
const updateUser = async (user) => {
    await db
        .update("users", { email: user.email, is_active: user.isActive }, { id: user.id })
        .run((0, db_pool_1.getDbPool)());
};
exports.userApi = {
    createUser,
    createUserValidationEmailData,
    deleteUserValidationEmailData,
    getUserByEmail,
    getUserById,
    getUserValidationEmailDataByKey,
    updateUser,
};
//# sourceMappingURL=user_api.js.map