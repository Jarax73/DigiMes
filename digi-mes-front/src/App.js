import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Menu from "./components/Menu";
import Welcome from "./components/Welcome";
import axios from "axios";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState([]);
  const [discussion, setDiscussion] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {
    const storage = window.localStorage.getItem("token");
    setToken(storage);
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  const logUser = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.mail.value,
      password: e.target.password.value,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/login",
      data: user,
    })
      .then((response) => {
        if (response.data.success === true)
          window.location.href = "http://localhost:3002/";
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        console.log(response.data.token.split(" ")[1]);
      })
      .then((response) => {
        if (response.data.success === true)
          window.location.href = "http://localhost:3002/";
        setUser(response.data);
        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        console.log(response.data.token.split(" ")[1]);
      })
      .catch((error) => error);
    e.target.reset();
  };

  return (
    <AppContext.Provider
      value={{ Jakaps, discussion, user, logUser, setDiscussion }}
    >
      <div className="container">
        {!token ? (
          <Welcome />
        ) : (
          <>
            <Menu />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route exact path="/" element={<Home />} />
            </Routes>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
