import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./features/home/components/HomeScreen";
import { ReviewScreen } from "./features/review/components/ReviewScreen";
import { APP_ROUTES } from "./features/navigation/navigation_constants";
import { LoginScreen } from "./features/login/components/LoginScreen";
import { ValidateScreen } from "./features/user/components/ValidateScreen";
import { Provider, useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "./features/user/redux/user_selectors";
import { store } from "./features/user/redux/user_store";

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <div className="App">
        <Router />
      </div>
    </Provider>
  );
}

const Router = (): React.ReactElement => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {isUserLoggedIn ? (
          <>
            <Route path={APP_ROUTES.REVIEW} element={<ReviewScreen />} />
            <Route path={APP_ROUTES.HOME} element={<HomeScreen />} />
          </>
        ) : (
          <>
            <Route path={APP_ROUTES.HOME} element={<LoginScreen />} />
            <Route path={APP_ROUTES.VALIDATE} element={<ValidateScreen />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
