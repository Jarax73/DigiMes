/* eslint-disable no-undef */
import React, { createContext, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Menu from "./components/Menu";
import axios from "axios";
import SignIn from "./components/SignIn";
import io from "socket.io-client";
import Welcome from "./components/Welcome";

export const AppContext = createContext();
function App() {
  const socket = useRef(
    io(
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_PROD_API_URL
        : process.env.REACT_APP_DEV_API_URL
    )
  );

  const [user, setUser] = useState([]);
  const [discussion, setDiscussion] = useState([]);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [friends, setFriend] = useState([]);
  const [oneUser, setOneUser] = useState({});
  const [id, setId] = useState("");
  const [connected, setConnected] = useState([]);
  const [showFriends, setShowFriends] = useState(false);
  const [messageReceived, setMessageReceived] = useState(null);
  console.log(connected);
  useEffect(() => {
    const storage = window.localStorage.getItem("token");
    setToken(storage);
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    socket.current.on("updated_list", (data) => setConnected(data));
  }, []);

  const logUser = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.mail.value,
      password: e.target.password.value,
    };

    axios({
      method: "POST",
      url:
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_PROD_API_URL}api/auth/login`
          : `${process.env.REACT_APP_DEV_API_URL}api/auth/login`,
      data: user,
    })
      .then(async (response) => {
        if (response.data.success === true) {
          window.location.href = "/";
        }

        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
      })
      .catch((error) => error);
    e.target.reset();
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AppContext.Provider
      value={{
        token,
        Jakaps,
        discussion,
        user,
        logout,
        socket,
        connected,
        setConnected,
        setDiscussion,
        messageReceived,
        setMessageReceived,
        message,
        setMessage,
        friends,
        showFriends,
        setShowFriends,
        setFriend,
        oneUser,
        setOneUser,
        id,
        setId,
      }}
    >
      <div className="container">
        {token === null ? (
          <div className="sign">
            <div className="welcome">
              <div className="introduction">
                Bienvenue dans notre application de messagerie <br />
                DigiMes
              </div>
              <Routes>
                <Route path="/" element={<Welcome />}>
                  <Route path="/" element={<SignIn logUser={logUser} />} />
                  <Route path="/signup" element={<SignUp />} />
                </Route>
              </Routes>
            </div>
          </div>
        ) : (
          <>
            <Menu />
            <Home />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
