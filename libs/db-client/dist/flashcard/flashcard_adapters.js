"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardDbToFlashcard = void 0;
const flashcardDbToFlashcard = (flashcardDb) => {
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
exports.flashcardDbToFlashcard = flashcardDbToFlashcard;
//# sourceMappingURL=flashcard_adapters.js.map