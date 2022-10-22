/* eslint-disable no-undef */
import React, { createContext, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Menu from "./components/Menu";
import axios from "axios";
import SignIn from "./components/SignIn";
import SearchUser from "./components/SearchUser";
import { io } from "socket.io-client";
import Discussion from "./components/Discussion";
import Welcome from "./components/Welcome";

export const AppContext = createContext();
function App() {
  const socket = useRef(
    io.connect(
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_PROD_URL
        : process.env.REACT_APP_API_DEV_URL
    )
  );
  console.log(socket.id);
  const [user, setUser] = useState([]);
  const [discussion, setDiscussion] = useState([]);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [userToChat, setUserToChat] = useState([]);
  // const [room, setRoom] = useState("");
  const [friends, setFriend] = useState([]);
  const [oneUser, setOneUser] = useState({});
  const [id, setId] = useState("");
  console.log(message);
  useEffect(() => {
    const storage = window.localStorage.getItem("token");
    setToken(storage);
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    socket.current.on("message", (data) => {
      setMessage(data);
    });
  }, []);

  // useEffect(() => {
  //   socket.current.on("output_messages", (data) => console.log(data));
  // }, []);

  console.log(message);
  console.log(id);

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
          ? `${process.env.REACT_APP_PROD_API_URL}/api/auth/login`
          : `${process.env.REACT_APP_DEV_API_URL}/api/auth/login`,
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

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AppContext.Provider
      value={{
        token,
        socket,
        Jakaps,
        discussion,
        user,
        logUser,
        logout,
        setDiscussion,
        message,
        setMessage,
        setMessageReceived,
        messageReceived,
        userToChat,
        setUserToChat,
        // setRoom,
        friends,
        setFriend,
        oneUser,
        setOneUser,
        id,
        setId,
      }}
    >
      <div className="container">
        {!token ? (
          <Routes>
            <Route path="/" element={<Welcome />}>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        ) : (
          <>
            <Menu />
            <Routes>
              <Route path="/search" element={<SearchUser />} />
              <Route path="/discussions/:id" element={<Discussion />} />
              <Route exact path="/" element={<Home />} />
            </Routes>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
