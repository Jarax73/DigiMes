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
// import SearchUser from "./components/SearchUser";

// import Discussion from "./components/Discussion";
import Welcome from "./components/Welcome";

export const AppContext = createContext();
function App() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL;

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
  const [messageReceived, setMessageReceived] = useState([]);
  const [friends, setFriend] = useState([]);
  const [oneUser, setOneUser] = useState({});
  const [id, setId] = useState("");
  const [room, setRoom] = useState("");

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
      url:
        process.env.NODE_ENV === "production"
          ? `${apiUrl}api/auth/login`
          : `${apiUrl}api/auth/login`,
      data: user,
    })
      .then((response) => {
        if (response.data.success === true) window.location.href = "/";

        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
      })
      .catch((error) => error);
    e.target.reset();
  };

  const createRoom = (id) => {
    let room = Date.now() + Math.random();
    room = room.toString().replace(".", "_");
    setRoom(room);
    socket.current.emit("create", {
      room: room,
      userId: user.id,
      friendId: id,
    });
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
        socket,
        Jakaps,
        apiUrl,
        discussion,
        messageReceived,
        setMessageReceived,
        user,
        logUser,
        logout,
        setDiscussion,
        message,
        setMessage,
        friends,
        setFriend,
        oneUser,
        setOneUser,
        id,
        room,
        setId,
        createRoom,
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
                  <Route path="/" element={<SignIn />} />
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
