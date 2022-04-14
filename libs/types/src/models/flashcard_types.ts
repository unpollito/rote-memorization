export interface Flashcard {
  id: string;
  bin: number;
  numFailedAnswers: number;
  lastAnswerAt?: string;
  frontText: string;
  backText: string;
}

export interface FlashcardWithUser extends Flashcard {
  userId: string;
}
