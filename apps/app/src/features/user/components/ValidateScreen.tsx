import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateKeyAndLogIn } from "../procedures/user_procedures";

export const ValidateScreen = (): React.ReactElement => {
  // This flow is so very simple that I'd rather not write a state machine for it.
  const navigation = useNavigate();
  const { key } = useParams();
  const [hasValidationError, setHasValidationError] = useState(false);

  useEffect(() => {
    if (typeof key === "string") {
      validateKeyAndLogIn(key).then(
        () => {
          navigation("/");
        },
        () => {
          setHasValidationError(true);
        }
      );
    } else {
      navigation("/");
    }
  }, []);

  return hasValidationError ? (
    <div>
      <p>Failed to validate your email address - please try again.</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigation("/");
        }}
      >
        Try again
      </button>
    </div>
  ) : (
    <p>Validating your email address...</p>
  );
};
