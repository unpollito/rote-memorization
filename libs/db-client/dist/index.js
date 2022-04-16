"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const flashcard_api_1 = require("./flashcard/flashcard_api");
const user_api_1 = require("./user/user_api");
exports.db = {
    flashcard: flashcard_api_1.flashcardApi,
    user: user_api_1.userApi,
};
//# sourceMappingURL=index.js.map