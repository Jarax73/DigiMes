import React, { createContext, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Menu from "./components/Menu";
import Welcome from "./components/Welcome";
import axios from "axios";
import SignIn from "./components/SignUp";
import SearchUser from "./components/SearchUser";
import { io } from "socket.io-client";
import Discussion from "./components/Discussion";

export const AppContext = createContext();
// console.log(socket.emit());
function App() {
  const socket = useRef(io.connect("http://localhost:5000"));
  const [user, setUser] = useState([]);
  const [discussion, setDiscussion] = useState([]);
  const [token, setToken] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [userToChat, setUserToChat] = useState([]);
  console.log(socket.current);
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
          window.location.href = "http://localhost:3000/";

        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data.token.split(" ")[1]);
      })
      .catch((error) => error);
    e.target.reset();
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "http://localhost:3000/login";
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
      }}
    >
      <div className="container">
        {!token ? (
          <Welcome />
        ) : (
          <>
            <Menu />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
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
