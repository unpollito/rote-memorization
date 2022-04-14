import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./features/home/components/HomeScreen";
import { ReviewScreen } from "./features/review/components/ReviewScreen";
import { APP_ROUTES } from "./features/navigation/navigation_constants";

function App(): React.ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.REVIEW} element={<ReviewScreen />} />
          <Route path={APP_ROUTES.HOME} element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
