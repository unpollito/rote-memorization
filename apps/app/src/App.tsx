import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./features/home/components/HomeScreen";
import { ReviewScreen } from "./features/review/components/ReviewScreen";
import { APP_ROUTES } from "./features/navigation/navigation_constants";
import { LoginScreen } from "./features/login/components/LoginScreen";

function App(): React.ReactElement {
  // const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const isUserLoggedIn = false;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isUserLoggedIn ? (
            <>
              <Route path={APP_ROUTES.REVIEW} element={<ReviewScreen />} />
              <Route path={APP_ROUTES.HOME} element={<HomeScreen />} />
            </>
          ) : (
            <Route path={APP_ROUTES.HOME} element={<LoginScreen />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
