import { User } from "@shortform-flashcards/types";
import { store } from "../redux/user_store";
import { serviceApi } from "../../service/procedures/service_procedures";

export const setUserFromJwt = (jwt: string): void => {
  const user = JSON.parse(atob(jwt.split(".")[1])) as User;
  store.dispatch({ jwt, type: "LOGIN", user });
};

export const logoutUser = (): void => {
  store.dispatch({ type: "LOGOUT" });
};

export const validateKeyAndLogIn = async (key: string): Promise<void> => {
  const jwt = await serviceApi.validateKey(key);
  setUserFromJwt(jwt);
};
