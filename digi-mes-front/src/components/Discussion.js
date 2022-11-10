import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { AppContext } from "../App";
import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";

export default function Discussion() {
  const {
    Jakaps,
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
    messageLoad.map((message) => {
      console.log(message);
      setConnected((prevState) =>
        prevState.map((connected) => {
          return connected._id === message.sender ||
            connected._id === message.to
            ? {
                ...connected,
                messages: [...connected.messages, message],
              }
            : // : connected._id === message.to
              // ? {
              //     ...connected,
              //     messages: [...connected.messages, message],
              //   }
              connected;
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

  console.log(messageReceived);

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
  console.log(connected);
  const [selectUser, setSelectUser] = useState(null);
  useEffect(() => {
    socket.current.emit("update_user", selectUser);
  }, [selectUser]);

  useEffect(() => {
    if (!oneUser) return;
    if (!connected) return;
    setSelectUser(connected.find((user) => user._id === oneUser._id));
  }, [oneUser, connected]);
  console.log(selectUser);

  return (
    <section className="discuss">
      <header className="discuss-head">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>{oneUser.firstName}</h3>
          {oneUser.socket === undefined ? <p>Disconnect</p> : <p>Online</p>}
        </div>
      </header>
      <hr style={{ width: "90%" }} />
      <div className="to-discuss">
        {selectUser &&
          selectUser.messages.map((message, index) => (
            <Discuss key={index} message={message} />
          ))}
      </div>
      <div className="send-message">
        <hr style={{ width: "90%", marginBottom: "20px" }} />
        <WriteMessage sendMessage={sendMessage} />
      </div>
    </section>
  );
}
