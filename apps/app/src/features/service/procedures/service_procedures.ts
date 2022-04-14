import axios from "axios";
import { Flashcard, PATH } from "@shortform-flashcards/types";

// TODO: this could be made much nicer as this grew: group endpoints by type, add validations, handle common code
// such as pattern replacements in URLs... but for now this should do.

export const serviceApi = {
  answerFlashcard: async ({
    flashcard,
    isCorrect,
  }: {
    flashcard: Flashcard;
    isCorrect: boolean;
  }): Promise<void> => {
    const endpoint = PATH.flashcards.answerFlashcard.replace(
      ":id",
      flashcard.id
    );
    await axios.post(getUrl(endpoint), { isCorrect });
  },

  getFlashcards: async (): Promise<Flashcard[]> => {
    const result = await axios.get(
      process.env.REACT_APP_SERVER_ENDPOINT + PATH.flashcards.getFlashcards
    );
    return result.data; // TODO: validation, error handling
  },
};

const getUrl = (endpoint: string): string =>
  process.env.REACT_APP_SERVER_ENDPOINT + endpoint;
