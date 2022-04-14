"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedFlashcardsForReview = exports.getFlashcardAfterAnswer = exports.isFlashcardReviewableNow = exports.willFlashcardBeReviewable = void 0;
const luxon_1 = require("luxon");
const flashcard_common_constants_1 = require("./flashcard_common_constants");
const willFlashcardBeReviewable = (flashcard) => 
// Sanity check: NO_REVIEW_BIN might be undefined (shouldn't as per the definition, but just in case).
// If that ever happens, assume that the flashcard can still be reviewed.
(flashcard_common_constants_1.NO_REVIEW_BIN === undefined || flashcard.bin < flashcard_common_constants_1.NO_REVIEW_BIN) &&
    flashcard.numFailedAnswers < flashcard_common_constants_1.MAX_INCORRECT_ANSWERS;
exports.willFlashcardBeReviewable = willFlashcardBeReviewable;
const isFlashcardReviewableNow = (flashcard) => {
    if (!(0, exports.willFlashcardBeReviewable)(flashcard)) {
        return false;
    }
    const now = luxon_1.DateTime.now();
    const reviewableFrom = getTimeForReview(flashcard);
    return reviewableFrom <= now;
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
const getSortedFlashcardsForReview = (flashcards) => flashcards.sort((a, b) => (a.bin > b.bin ? -1 : 1));
exports.getSortedFlashcardsForReview = getSortedFlashcardsForReview;
const getTimeForReview = (flashcard) => {
    var _a;
    return flashcard.lastAnswerAt
        ? luxon_1.DateTime.fromISO(flashcard.lastAnswerAt, {
            zone: "UTC",
        }).plus({
            seconds: (_a = flashcard_common_constants_1.FLASHCARD_REVIEW_TIMES[flashcard.bin]) !== null && _a !== void 0 ? _a : 0,
        })
        : luxon_1.DateTime.fromISO("1970-01-01");
};
//# sourceMappingURL=flashcard_functions.js.map