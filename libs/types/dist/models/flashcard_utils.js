"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardWithUserToFlashcard = void 0;
const flashcardWithUserToFlashcard = (flashcard) => {
    // INTENDED: we want to ignore the userId
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...remainingFields } = flashcard;
    return remainingFields;
};
exports.flashcardWithUserToFlashcard = flashcardWithUserToFlashcard;
//# sourceMappingURL=flashcard_utils.js.map