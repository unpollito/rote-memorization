import { User } from "@shortform-flashcards/types";
import { store } from "../redux/user_store";

export const setUserFromJwt = (jwt: string): void => {
  const user = JSON.parse(jwt.split(".")[1]) as User;
  store.dispatch({ jwt, type: "LOGIN", user });
};

export const logoutUser = (): void => {
  store.dispatch({ type: "LOGOUT" });
};
