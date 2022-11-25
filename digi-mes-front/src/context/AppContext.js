/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { createContext, useEffect, useRef, useState } from "react";
import ProfilePicture from "../assets/defaultPicture.jpg";
import io from "socket.io-client";
import { apiUrl } from "../address/UrlAddress";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const socket = useRef(io(apiUrl));

  const [user, setUser] = useState([]);
  const [discussion, setDiscussion] = useState([]);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [friends, setFriend] = useState([]);
  const [oneUser, setOneUser] = useState({});
  const [id, setId] = useState("");
  const [connected, setConnected] = useState([]);
  const [showFriends, setShowFriends] = useState(false);
  const [messageLoad, setMessageLoad] = useState([]);
  const [messageReceived, setMessageReceived] = useState(null);
  const [userInfo, setUserInfo] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const storage = window.localStorage.getItem("token");
    setToken(storage);
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    socket.current.on("updated_list", (data) => setConnected(data));
  }, []);

  useEffect(() => {
    socket.current.on("output_messages", (data) => {
      setMessageLoad(data);
    });
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AppContext.Provider
      value={{
        token,
        ProfilePicture,
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
        messageLoad,
        setMessage,
        friends,
        showFriends,
        setShowFriends,
        setFriend,
        oneUser,
        setOneUser,
        id,
        setId,
        userInfo,
        setUserInfo,
        profilePicture,
        setProfilePicture,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
