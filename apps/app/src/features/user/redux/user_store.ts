import { createStore } from "redux";
import { UserAction, UserState } from "./user_store_types";

const initialState: UserState = {};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  if (action.type === "LOGIN") {
    return {
      jwt: action.jwt,
      user: action.user,
    };
  } else {
    return {};
  }
};

export const store = createStore(userReducer);

console.log(store);
