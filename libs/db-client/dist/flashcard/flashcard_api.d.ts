import { Flashcard, FlashcardWithUser } from "@shortform-flashcards/types";
export declare const flashcardApi: {
    getAllFlashcardsForUser: (userId?: string) => Promise<FlashcardWithUser[]>;
    getFlashcard: (flashcardId: string) => Promise<FlashcardWithUser | undefined>;
    updateFlashcard: (flashcard: Flashcard) => Promise<void>;
};
//# sourceMappingURL=flashcard_api.d.ts.map