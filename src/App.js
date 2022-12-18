import "./styles.css";
import Login from "./components/login";
import Singup from "./components/singup";
import Home from "./components/home";
import React, { useState } from "react";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toggle from "./components/toggle";
import Navbar from "./components/nav";
import withProtected from "./components/protectComponent";
import NoMatch from "./components/noMatch";
import callBackendApi from "./common";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

export const ThemeContext = React.createContext();

const themes = {
  light: {
    background: "#fff",
    color: "#000",
  },
  dark: {
    background: "#171717",
    color: "#fff",
  },
};

function App() {
  const [theme, setTheme] = useState("light");

  const [userProfile, setUserProfile] = useState(null);

  const getUserProfile = async () => {
    const makeRequest = await callBackendApi("get", "/api/auth/profile");

    setUserProfile(makeRequest.data);
  };

  const toggleUserProfile = () => {
    setUserProfile(null);
  };

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const providerValue = {
    theme: themes[theme],
    userProfile,
    toggleTheme,
    getUserProfile,
    toggleUserProfile,
  };

  console.log(theme);

  let ProtectedHome = withProtected(Home);

  return (
    <div className={`app d-flex border flex-column theme-${theme}`}>
      <ThemeContext.Provider value={providerValue}>
        <Toggle />

        <Navbar />

        <Switch>
          <Route exact path="/">
            <div className="d-flex justify-content-center mt-5">
              <h1>Login</h1>
            </div>
            <Login />
          </Route>

          <Route exact path="/signup">
            <div className="d-flex justify-content-center mt-5">
              <h1>SignUp</h1>
            </div>
            <Singup />
          </Route>

          <Route exact path="/home">
            <div className="d-flex justify-content-center mt-5">
              <h1>Home</h1>
            </div>
            <ProtectedHome />
          </Route>

          <Route path="*">
            <h1>No Match</h1>
            <NoMatch />
          </Route>
        </Switch>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
