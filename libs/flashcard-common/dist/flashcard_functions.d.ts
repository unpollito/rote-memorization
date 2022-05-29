import { Flashcard } from "@rote-memorization/types";
export declare const willFlashcardBeReviewable: (flashcard: Flashcard) => boolean;
export declare const isFlashcardReviewableNow: (flashcard: Flashcard) => boolean;
export declare const getFlashcardAfterAnswer: ({ flashcard, isCorrect, }: {
    flashcard: Flashcard;
    isCorrect: boolean;
}) => Flashcard;
export declare const getSortedFlashcardsForReview: (flashcards: Flashcard[]) => Flashcard[];
//# sourceMappingURL=flashcard_functions.d.ts.map