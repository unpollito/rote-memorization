import { flashcardApi } from "./flashcard/flashcard_api";
import { userApi } from "./user/user_api";

export const db = {
  flashcard: flashcardApi,
  user: userApi,
};
