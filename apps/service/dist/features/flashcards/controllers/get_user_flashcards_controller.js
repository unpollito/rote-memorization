"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFlashcardsController = void 0;
const db_client_1 = require("@shortform-flashcards/db-client");
const types_1 = require("@shortform-flashcards/types");
const getUserFlashcardsController = async (_, res) => {
    const flashcards = await db_client_1.db.flashcard.getAllFlashcardsForUser();
    res.send(JSON.stringify(flashcards.map(types_1.flashcardWithUserToFlashcard)));
};
exports.getUserFlashcardsController = getUserFlashcardsController;
//# sourceMappingURL=get_user_flashcards_controller.js.map