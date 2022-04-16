import "./LoginScreen.css";
import { useMachine } from "@xstate/react";
import { loginScreenMachine } from "../machines/login_screen_machine";

export const LoginScreen = (): React.ReactElement => {
  const [state, send] = useMachine(loginScreenMachine);

  return (
    <div>
      <h1>Flashcards</h1>
      {state.matches("registrationComplete") ? (
        <p>
          We've sent an email with a link to your email address. Please open
          this link to complete registration.
        </p>
      ) : (
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="login-form_input"
            disabled={!state.matches("idle")}
            onChange={(e) => send({ email: e.target.value, type: "SET_EMAIL" })}
            placeholder="Email"
            type="email"
            value={state.context.email}
          />
          <input
            className="login-form_input"
            disabled={!state.matches("idle")}
            onChange={(e) =>
              send({ password: e.target.value, type: "SET_PASSWORD" })
            }
            placeholder="Password"
            type="password"
            value={state.context.password}
          />
          <button
            className="login-form_button-login"
            disabled={!state.matches("idle")}
            onClick={() => send({ type: "LOGIN" })}
          >
            Log in
          </button>
          <button
            className="login-form_button-register"
            disabled={!state.matches("idle")}
            onClick={() => send({ type: "REGISTER" })}
          >
            Register
          </button>
          {state.context.loginFailed ? (
            <p className="error-message">
              Failed to log in - maybe you haven't validated your email address?
            </p>
          ) : undefined}
          {state.context.registrationFailed ? (
            <p className="error-message">
              Failed to register - maybe the account exists already?
            </p>
          ) : undefined}
        </form>
      )}
    </div>
  );
};
