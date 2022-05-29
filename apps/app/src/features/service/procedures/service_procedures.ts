import axios from "axios";
import { Flashcard, PATH } from "@rote-memorization/types";
import { selectUserJwt } from "../../user/redux/user_selectors";
import { store } from "../../user/redux/user_store";

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
    await axios.post(
      getUrl(endpoint),
      { isCorrect },
      { headers: getAuthorizationHeaders() }
    );
  },

  getFlashcards: async (): Promise<Flashcard[]> => {
    const result = await axios.get(getUrl(PATH.flashcards.getFlashcards), {
      headers: getAuthorizationHeaders(),
    });
    return result.data; // TODO: validation, error handling
  },

  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> => {
    const result = await axios.post(getUrl(PATH.user.login), {
      email,
      password,
    });
    return result.data;
  },

  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    await axios.post(getUrl(PATH.user.register), {
      email,
      password,
    });
  },

  validateKey: async (key: string): Promise<string> => {
    const endpoint = PATH.user.validate.replace(":key", key);
    const result = await axios.post(getUrl(endpoint), {
      key,
    });
    return result.data;
  },
};

const getUrl = (endpoint: string): string =>
  process.env.REACT_APP_SERVER_ENDPOINT + endpoint;

const getAuthorizationHeaders = (): { Authorization?: string } => {
  const jwt = selectUserJwt(store.getState());
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
};
