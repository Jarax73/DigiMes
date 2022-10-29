import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../App";
import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";

export default function Discussion() {
  const {
    Jakaps,
    oneUser,
    user,
    socket,
    message,
    setMessage,
    // connected,
    messageReceived,
    setMessageReceived,
  } = useContext(AppContext);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      time: Date.now(),
      discussion: message,
      to: oneUser.socket,
      socket: socket.current.id,
      sender: user,
    };
    socket.current.emit("private_message", messageData);
    setMessageReceived((list) => [...list, messageData]);
    setMessage("");
  };
  useEffect(() => {
    socket.current.on("private_message", (data) => {
      if (data.to === socket.current.id) {
        setMessageReceived((list) => [...list, data]);
      }
      console.log(data);
    });
  }, [socket]);

  const deleteMessage = (id) => {
    axios.delete(`http://localhost:5000/api/discussions/${id}`).then((res) => {
      res.data;
    });
  };

  return (
    <section className="discuss">
      <header className="discuss-head">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>{oneUser.firstName}</h3>
          <p>Online</p>
        </div>
      </header>
      <hr style={{ width: "90%" }} />
      <div className="to-discuss">
        {messageReceived.map((messageContent) => {
          return (
            <Discuss
              key={messageContent._id}
              user={user}
              deleteMessage={deleteMessage}
              messageContent={messageContent}
            />
          );
        })}
      </div>
      <div className="send-message">
        <hr style={{ width: "90%", marginBottom: "20px" }} />
        <WriteMessage sendMessage={sendMessage} />
      </div>
    </section>
  );
}
