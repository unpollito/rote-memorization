import { UserState } from "./user_store_types";

export const selectIsUserLoggedIn = (state: UserState): boolean =>
  !!state.user && !!state.jwt;

export const selectUserJwt = (state: UserState): string | undefined =>
  state.jwt;
