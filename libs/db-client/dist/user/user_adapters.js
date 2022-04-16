"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationDbToUserValidationEmailData = exports.userToUserDb = exports.userDbToUser = void 0;
const userDbToUser = (userDb) => ({
    email: userDb.email,
    id: userDb.id,
    isActive: userDb.is_active,
    password: userDb.password,
});
exports.userDbToUser = userDbToUser;
const userToUserDb = (user) => ({
    email: user.email,
    id: user.id,
    is_active: user.isActive,
    password: user.password,
});
exports.userToUserDb = userToUserDb;
const userValidationDbToUserValidationEmailData = (emailData) => ({
    key: emailData.key,
    sentAt: emailData.sent_at,
});
exports.userValidationDbToUserValidationEmailData = userValidationDbToUserValidationEmailData;
//# sourceMappingURL=user_adapters.js.map