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
exports.flashcardApi = void 0;
const db_constants_1 = require("../constants/db_constants");
const db = __importStar(require("zapatos/db"));
const flashcard_adapters_1 = require("./flashcard_adapters");
const db_pool_1 = require("../db/db_pool");
const createFlashcard = async (flashcard) => {
    await db
        .insert("flashcards", (0, flashcard_adapters_1.flashcardWithUserToFlashcardDb)(flashcard))
        .run((0, db_pool_1.getDbPool)());
};
const getAllFlashcardsForUser = async (userId = db_constants_1.USER_ID) => {
    const flashcards = await db
        .select("flashcards", { user_id: userId })
        .run((0, db_pool_1.getDbPool)());
    return flashcards.map(flashcard_adapters_1.flashcardDbToFlashcardWithUser);
};
const getFlashcard = async (flashcardId) => {
    const flashcard = await db
        .selectOne("flashcards", { id: flashcardId })
        .run((0, db_pool_1.getDbPool)());
    return flashcard ? (0, flashcard_adapters_1.flashcardDbToFlashcardWithUser)(flashcard) : undefined;
};
const updateFlashcard = async (flashcard) => {
    await db
        .update("flashcards", {
        bin: flashcard.bin,
        last_answer_at: new Date().toISOString(),
        num_failed_answers: flashcard.numFailedAnswers,
    }, {
        id: flashcard.id,
    })
        .run((0, db_pool_1.getDbPool)());
};
exports.flashcardApi = {
    createFlashcard,
    getAllFlashcardsForUser,
    getFlashcard,
    updateFlashcard,
};
//# sourceMappingURL=flashcard_api.js.map