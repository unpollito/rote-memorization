"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const types_1 = require("@shortform-flashcards/types");
const get_user_flashcards_controller_1 = require("./features/flashcards/controllers/get_user_flashcards_controller");
const answer_flashcards_controller_1 = require("./features/flashcards/controllers/answer_flashcards_controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get(types_1.PATH.flashcards.getFlashcards, get_user_flashcards_controller_1.getUserFlashcardsController);
app.post(types_1.PATH.flashcards.answerFlashcard, answer_flashcards_controller_1.answerFlashcardsController);
app.listen(process.env.PORT);
//# sourceMappingURL=index.js.map