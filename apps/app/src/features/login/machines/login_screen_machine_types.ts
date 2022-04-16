export interface LoginScreenContext {
  email: string;
  loginFailed: boolean;
  password: string;
  registrationFailed: boolean;
}

export type LoginScreenEvent =
  | { type: "LOGIN" }
  | { type: "REGISTER" }
  | { email: string; type: "SET_EMAIL" }
  | { password: string; type: "SET_PASSWORD" };

export interface LoginScreenTypeState {
  context: LoginScreenContext;
  value:
    | "idle"
    | "loggingIn"
    | "registering"
    | "loginComplete"
    | "registrationComplete";
}
