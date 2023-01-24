/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import Discussion from "./Discussion";
import SearchUser from "./SearchUser";
import WelcomeMessage from "./WelcomeMessage";
import Friends from "./Friends";
import ProfilPicture from "./ProfilePicture";
import { AppContext } from "../context/AppContext";
// import Discuss from "./Discuss";

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
    setMessageLoad,
    setMessage,
    messageReceived,
    setMessageReceived,
    // connected,
    setConnected,
  } = useContext(AppContext);

  const messages = messageLoad?.map((message) =>
    (message?.sender === oneUser._id && message?.to === user._id) ||
    (message?.sender === user._id && message?.to === oneUser._id)
      ? message
      : null
  );

  useEffect(() => {
    // console.log(messages);
    messages.map((message) => {
      setConnected((prevState) =>
        prevState.map((connected) => {
          return (message?.to === connected._id &&
            message?.sender === connected._id) ||
            (message?.to === user._id && message?.sender === user._id)
            ? { ...connected, messages: [...connected.messages, message] }
            : connected;
        })
      );
    });
  }, []);

  // useEffect(() => {
  //   setConnected((prevState) =>
  //     prevState.map((user) => {
  //       return { ...user, messages: [...user.messages, messages] };
  //     })
  //   );
  // }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = {
        time:
          new Date(Date.now()).toDateString() +
          " " +
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        discussion: message,
        isImage: false,
        to: id,
        socketTo: oneUser.socket,
        socket: socket.current.id,
        sender: user._id,
      };

      socket.current.emit("private_message", messageData);
      setMessageLoad([...messageLoad, messageData]);
      // setConnected((prevState) =>
      //   prevState.map((user) => {
      //     return { ...user, messages: [...user.messages, messages] };
      //   })
      // );
      setMessage("");
    } else {
      alert("Le champ est vide");
    }
  };

  useEffect(() => {
    socket.current.on("private_message", (data) => {
      if (data.to === user._id) {
        setMessageReceived(data);
      }
    });
  }, []);

  useEffect(() => {
    setMessageLoad([...messageLoad, messageReceived]);
  }, [messageReceived]);

  // const deleteMessage = (id) => {
  //   axios.delete(`http://localhost:5000/api/discussions/${id}`).then((res) => {
  //     res.data;
  //   });
  // };

  return (
    <>
      <section className="users">
        <SearchUser />
        <Friends setShown={setShown} messages={messages} />
      </section>
      <section className="discuss">
        {shown === false ? (
          userInfo === false ? (
            <WelcomeMessage />
          ) : (
            <ProfilPicture />
          )
        ) : userInfo === false ? (
          <Discussion sendMessage={sendMessage} messages={messages} />
        ) : (
          <ProfilPicture />
        )}
      </section>
    </>
  );
}
