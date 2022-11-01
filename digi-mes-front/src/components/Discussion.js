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
    setMessage,
    connected,
    messageReceived,
    setMessageReceived,
    setConnected,
    setOneUser,
  } = useContext(AppContext);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      time: Date.now(),
      discussion: message,
      to: id,
      socketTo: oneUser.socket,
      socket: socket.current.id,
      sender: user,
    };
    socket.current.emit("private_message", messageData);
    setConnected((prevState) =>
      prevState.map((connected) => {
        return connected.id === messageData.to
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
      if (data.socketTo === socket.current.id) {
        setMessageReceived(data);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (!messageReceived) return;
    setConnected((prevState) =>
      prevState.map((connected) => {
        return connected.id === messageReceived.sender.id
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
    setSelectUser(connected.find((user) => user.id === oneUser.id));
  }, [oneUser, connected]);

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
