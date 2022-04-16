import React from "react";
import "./HomeScreen.css";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../navigation/navigation_constants";
import { logoutUser } from "../../user/procedures/user_procedures";

export function HomeScreen(): React.ReactElement {
  return (
    <header className="home_header">
      <h1>Flashcards</h1>
      <p>
        <Link to={APP_ROUTES.REVIEW}>Start review session</Link>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            logoutUser();
          }}
        >
          Logout
        </a>
      </p>
    </header>
  );
}
