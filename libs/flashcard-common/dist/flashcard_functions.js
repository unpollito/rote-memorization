"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlashcardAfterAnswer = exports.isFlashcardReviewableNow = exports.willFlashcardBeReviewable = void 0;
const luxon_1 = require("luxon");
const flashcard_common_constants_1 = require("./flashcard_common_constants");
const willFlashcardBeReviewable = (flashcard) => (flashcard_common_constants_1.NO_REVIEW_BIN === undefined || flashcard.bin < flashcard_common_constants_1.NO_REVIEW_BIN) &&
    flashcard.numFailedAnswers < flashcard_common_constants_1.MAX_INCORRECT_ANSWERS;
exports.willFlashcardBeReviewable = willFlashcardBeReviewable;
const isFlashcardReviewableNow = (flashcard) => {
    var _a;
    if (!(0, exports.willFlashcardBeReviewable)(flashcard)) {
        return false;
    }
    if (!flashcard.lastAnswerAt) {
        return true;
    }
    const now = luxon_1.DateTime.now();
    const reviewableFrom = luxon_1.DateTime.fromISO(flashcard.lastAnswerAt).plus({
        seconds: (_a = flashcard_common_constants_1.FLASHCARD_REVIEW_TIMES[flashcard.bin]) !== null && _a !== void 0 ? _a : 0,
    });
    return reviewableFrom > now;
};
exports.isFlashcardReviewableNow = isFlashcardReviewableNow;
const getFlashcardAfterAnswer = ({ flashcard, isCorrect, }) => {
    if (isCorrect) {
        return {
            ...flashcard,
            bin: flashcard.bin + 1,
            lastAnswerAt: luxon_1.DateTime.now().toISO(),
        };
    }
    else {
        return {
            ...flashcard,
            bin: 1,
            lastAnswerAt: luxon_1.DateTime.now().toISO(),
            numFailedAnswers: flashcard.numFailedAnswers + 1,
        };
    }
};
exports.getFlashcardAfterAnswer = getFlashcardAfterAnswer;
//# sourceMappingURL=flashcard_functions.js.map