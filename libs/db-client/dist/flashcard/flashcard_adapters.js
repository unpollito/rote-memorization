"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardWithUserToFlashcardDb = exports.flashcardDbToFlashcardWithUser = void 0;
const flashcardDbToFlashcardWithUser = (flashcardDb) => {
    var _a;
    return ({
        id: flashcardDb.id,
        userId: flashcardDb.user_id,
        bin: flashcardDb.bin,
        lastAnswerAt: (_a = flashcardDb.last_answer_at) !== null && _a !== void 0 ? _a : undefined,
        numFailedAnswers: flashcardDb.num_failed_answers,
        frontText: flashcardDb.front_text,
        backText: flashcardDb.back_text,
    });
};
exports.flashcardDbToFlashcardWithUser = flashcardDbToFlashcardWithUser;
const flashcardWithUserToFlashcardDb = (flashcard) => {
    var _a;
    return ({
        back_text: flashcard.backText,
        bin: flashcard.bin,
        front_text: flashcard.frontText,
        id: flashcard.id,
        // TODO: validate this
        last_answer_at: (_a = flashcard.lastAnswerAt) !== null && _a !== void 0 ? _a : null,
        num_failed_answers: flashcard.numFailedAnswers,
        user_id: flashcard.userId,
    });
};
exports.flashcardWithUserToFlashcardDb = flashcardWithUserToFlashcardDb;
//# sourceMappingURL=flashcard_adapters.js.map