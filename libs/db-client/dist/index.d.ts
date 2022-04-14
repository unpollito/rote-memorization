export declare const db: {
    flashcard: {
        getAllFlashcardsForUser: (userId?: string) => Promise<import("libs/types/dist").FlashcardWithUser[]>;
        getFlashcard: (flashcardId: string) => Promise<import("libs/types/dist").FlashcardWithUser | undefined>;
        updateFlashcard: (flashcard: import("libs/types/dist").Flashcard) => Promise<void>;
    };
};
//# sourceMappingURL=index.d.ts.map