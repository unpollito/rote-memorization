"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_client_1 = require("@shortform-flashcards/db-client");
const app = (0, express_1.default)();
app.get("/", async function (_, res) {
    res.send(JSON.stringify(await db_client_1.db.flashcard.getAllFlashcardsForUser()));
});
app.listen(process.env.PORT);
//# sourceMappingURL=index.js.map