import {
  Flashcard,
  FlashcardWithUser,
  User,
} from "@rote-memorization/types";
import { v4 as uuidv4 } from "uuid";
import { db } from "@rote-memorization/db-client";

export const populateUserFlashcards = async (user: User): Promise<void> => {
  const flashcards = pickRandomItems({ arr: FLASHCARD_DEFINITIONS, n: 5 }).map(
    ({ backText, frontText }): FlashcardWithUser => ({
      backText,
      bin: 0,
      frontText,
      id: uuidv4(),
      lastAnswerAt: undefined,
      numFailedAnswers: 0,
      userId: user.id,
    })
  );
  await Promise.all(flashcards.map(db.flashcard.createFlashcard));
};

const FLASHCARD_DEFINITIONS: Pick<Flashcard, "backText" | "frontText">[] = [
  { backText: "dog", frontText: "Hund" },
  { backText: "cat", frontText: "Katze" },
  { backText: "sad", frontText: "traurig" },
  { backText: "happy", frontText: "glücklich" },
  { backText: "horse", frontText: "Pferd" },
  { backText: "dragon", frontText: "Drache" },
  { backText: "to eat", frontText: "essen" },
  { backText: "food", frontText: "Essen" },
  { backText: "wall", frontText: "Wand" },
  { backText: "to cry", frontText: "weinen" },
];

const pickRandomItems = <T>({ arr, n }: { arr: T[]; n: number }): T[] => {
  const remainingItems = arr.slice();
  if (n >= arr.length) {
    return remainingItems;
  }
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * remainingItems.length);
    result.push(...remainingItems.splice(index, 1));
  }
  return result;
};
