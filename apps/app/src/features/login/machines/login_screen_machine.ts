import { assign, createMachine } from "xstate";
import {
  LoginScreenContext,
  LoginScreenEvent,
  LoginScreenTypeState,
} from "./login_screen_machine_types";
import { serviceApi } from "../../service/procedures/service_procedures";
import { setUserFromJwt } from "../../user/procedures/user_procedures";

export const loginScreenMachine = createMachine<
  LoginScreenContext,
  LoginScreenEvent,
  LoginScreenTypeState
>(
  {
    id: "loginScreen",
    initial: "idle",
    context: {
      email: "",
      loginFailed: false,
      password: "",
      registrationFailed: false,
    },
    states: {
      idle: {
        on: {
          SET_EMAIL: {
            actions: assign((_, event) => ({
              email: event.email,
              loginFailed: false,
              registrationFailed: false,
            })),
          },
          SET_PASSWORD: {
            actions: assign((_, event) => ({
              password: event.password,
              loginFailed: false,
              registrationFailed: false,
            })),
          },
          LOGIN: {
            target: "loggingIn",
          },
          REGISTER: {
            target: "registering",
          },
        },
      },
      loggingIn: {
        invoke: {
          src: "login",
          onDone: {
            actions: [
              (_, event) => {
                setUserFromJwt(event.data as string);
              },
            ],
            target: "loginComplete",
          },
          onError: {
            actions: [assign((_) => ({ loginFailed: true }))],
            target: "idle",
          },
        },
      },
      registering: {
        invoke: {
          src: "register",
          onDone: {
            target: "registrationComplete",
          },
          onError: {
            actions: [assign((_) => ({ registrationFailed: true }))],
            target: "idle",
          },
        },
      },
      loginComplete: {
        type: "final",
      },
      registrationComplete: {
        type: "final",
      },
    },
  },
  {
    services: {
      login: (context) =>
        serviceApi.login({ email: context.email, password: context.password }),
      register: (context) =>
        serviceApi.register({
          email: context.email,
          password: context.password,
        }),
    },
  }
);
