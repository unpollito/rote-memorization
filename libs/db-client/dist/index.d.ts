export declare const db: {
    flashcard: {
        createFlashcard: (flashcard: import("libs/types/dist").FlashcardWithUser) => Promise<void>;
        getAllFlashcardsForUser: (userId?: string) => Promise<import("libs/types/dist").FlashcardWithUser[]>;
        getFlashcard: (flashcardId: string) => Promise<import("libs/types/dist").FlashcardWithUser | undefined>;
        updateFlashcard: (flashcard: import("libs/types/dist").Flashcard) => Promise<void>;
    };
    user: {
        createUser: (user: import("libs/types/dist").UserWithPassword) => Promise<void>;
        createUserValidationEmailData: ({ emailData, userId, }: {
            emailData: import("libs/types/dist").UserValidationEmailData;
            userId: string;
        }) => Promise<void>;
        deleteUserValidationEmailData: (userId: string) => Promise<void>;
        getUserByEmail: (email: string) => Promise<import("libs/types/dist").UserWithPassword | undefined>;
        getUserById: (id: string) => Promise<import("libs/types/dist").UserWithPassword | undefined>;
        getUserValidationEmailDataByKey: (key: string) => Promise<import("libs/types/dist").UserValidationEmailDataWithUserWithPassword | undefined>;
        updateUser: (user: import("libs/types/dist").User) => Promise<void>;
    };
};
//# sourceMappingURL=index.d.ts.map