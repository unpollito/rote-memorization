import { User } from "@rote-memorization/types";

export interface LoginAction {
  jwt: string;
  user: User;
  type: "LOGIN";
}

export interface LogoutAction {
  type: "LOGOUT";
}

export type UserAction = LoginAction | LogoutAction;

export interface UserState {
  jwt?: string;
  user?: User;
}
