import React from "react";
import "./HomeScreen.css";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../navigation/navigation_constants";
import { logoutUser } from "../../user/procedures/user_procedures";

export function HomeScreen(): React.ReactElement {
  return (
    <div>
      <h1>Flashcards</h1>
      <div className={"links"}>
        <Link className="links_link--review" to={APP_ROUTES.REVIEW}>
          Start review session
        </Link>
        <a
          className="links_link--logout"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            logoutUser();
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
}
