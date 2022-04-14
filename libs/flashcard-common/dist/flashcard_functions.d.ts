import { Flashcard } from "@shortform-flashcards/types";
export declare const willFlashcardBeReviewable: (flashcard: Flashcard) => boolean;
export declare const isFlashcardReviewableNow: (flashcard: Flashcard) => boolean;
export declare const getFlashcardAfterAnswer: ({ flashcard, isCorrect, }: {
    flashcard: Flashcard;
    isCorrect: boolean;
}) => Flashcard;
//# sourceMappingURL=flashcard_functions.d.ts.map