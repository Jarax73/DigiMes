import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Menu from "./components/Menu";
import Welcome from "./components/Welcome";
import axios from "axios";
import SignIn from "./components/SignUp";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

export const AppContext = createContext();
console.log(socket.emit());
function App() {
  const [user, setUser] = useState([]);
  const [discussion, setDiscussion] = useState([]);
  const [token, setToken] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

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

        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data.token.split(" ")[1]);
      })
      .catch((error) => error);
    e.target.reset();
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setMessageReceived(data.message);
      },
      [socket]
    );
  });

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "http://localhost:3002/login";
  };

  return (
    <AppContext.Provider
      value={{
        Jakaps,
        discussion,
        user,
        logUser,
        logout,
        setDiscussion,
        message,
        setMessage,
        sendMessage,
        messageReceived,
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
              <Route exact path="/" element={<Home />} />
            </Routes>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
