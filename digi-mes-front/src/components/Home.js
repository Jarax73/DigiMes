/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import Discussion from "./Discussion";
import SearchUser from "./SearchUser";
import WelcomeMessage from "./WelcomeMessage";
import Friends from "./Friends";
import ProfilPicture from "./ProfilePicture";
import { AppContext } from "../context/AppContext";

export default function Home() {
  const [shown, setShown] = useState(false);
  const {
    userInfo,
    oneUser,
    user,
    id,
    socket,
    message,
    messageLoad,
    setMessage,
    connected,
    messageReceived,
    setMessageReceived,
    setConnected,
    setOneUser,
  } = useContext(AppContext);

  useEffect(() => {
    console.log(messageLoad);
    messageLoad.map((message) => {
      setConnected((prevState) =>
        prevState.map((connected) => {
          return connected._id === message.sender ||
            connected._id === message.to
            ? {
                ...connected,
                messages: [...connected.messages, message],
              }
            : connected;
        })
      );
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      time:
        new Date(Date.now()).toDateString() +
        " " +
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      discussion: message,
      to: id,
      socketTo: oneUser.socket,
      socket: socket.current.id,
      sender: user._id,
    };
    socket.current.emit("private_message", messageData);
    setConnected((prevState) =>
      prevState.map((connected) => {
        return connected._id === messageData.to
          ? {
              ...connected,
              messages: [...connected.messages, messageData],
            }
          : connected;
      })
    );
    setMessage("");
  };

  useEffect(() => {
    socket.current.on("private_message", (data) => {
      if (data.to === user._id) {
        setMessageReceived(data);
      }
    });
  }, []);

  useEffect(() => {
    if (!messageReceived) return;
    setConnected((prevState) =>
      prevState.map((connected) => {
        return connected._id === messageReceived.sender
          ? {
              ...connected,
              messages: [...connected.messages, messageReceived],
            }
          : connected;
      })
    );
    setOneUser((prevState) => prevState);
  }, [messageReceived]);

  // const deleteMessage = (id) => {
  //   axios.delete(`http://localhost:5000/api/discussions/${id}`).then((res) => {
  //     res.data;
  //   });
  // };
  const [selectUser, setSelectUser] = useState(null);

  useEffect(() => {
    if (!oneUser) return;
    if (!connected) return;
    setSelectUser(connected.find((user) => user._id === oneUser._id));
  }, [oneUser, connected]);

  return (
    <>
      <section className="users">
        <SearchUser />
        <Friends setShown={setShown} />
      </section>
      <section className="discuss">
        {shown === false ? (
          userInfo === false ? (
            <WelcomeMessage />
          ) : (
            <ProfilPicture />
          )
        ) : userInfo === false ? (
          <Discussion sendMessage={sendMessage} selectUser={selectUser} />
        ) : (
          <ProfilPicture />
        )}
      </section>
    </>
  );
}
