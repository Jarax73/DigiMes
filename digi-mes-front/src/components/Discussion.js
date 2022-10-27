/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { AppContext } from "../App";
import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";

export default function Discussion() {
  const {
    Jakaps,
    user,
    oneUser,
    socket,
    room,
    message,
    setMessage,
    messageReceived,
    setMessageReceived,
  } = useContext(AppContext);
  const [see, setSee] = useState({});
  // const deleteMessage = (id) => {
  //   axios.delete(`http://localhost:5000/api/discussions/${id}`).then((res) => {
  //     res.data;
  //   });
  // };

  useEffect(() => {
    socket.current.on("invite", (data) => {
      setSee(data);
      socket.current.emit("join_room", data);
    });
  }, []);
  console.log(see);

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = {
      time: new Date(Date.now()).getTime(),
      discussion: message,
      to: oneUser,
      sender: user,
    };
    await socket.current.emit("message", { room: room, data });
    setMessageReceived((list) => [...list, data]);
    setMessage("");
  };
  useEffect(() => {
    socket.current.on("message", (data) => {
      console.log(data);
      setMessageReceived((list) => [...list, data]);
    });
  }, []);

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
              // deleteMessage={deleteMessage}
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
