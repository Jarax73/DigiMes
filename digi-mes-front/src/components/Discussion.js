import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";
// import { useParams } from "react-router-dom";

export default function Discussion() {
  const {
    Jakaps,
    message,
    setMessage,
    id,
    oneUser,
    messageReceived,
    setMessageReceived,
    socket,
    user,
  } = useContext(AppContext);

  const [post, setPost] = useState("");

  useEffect(() => {
    socket.current.on("message", (data) => {
      console.log(data);
      setMessageReceived((list) => [...list, data]);
    });
  }, []);

  console.log(messageReceived);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = {
        time:
          new Date(Date.now()).getDay() +
          " " +
          new Date(Date.now()).getDate() +
          ", " +
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        discussion: message,
        to: id,
        sender: user,
      };
      await socket.current.emit("chat_message", messageData);
      setMessageReceived((list) => [...list, messageData]);
      // console.log(messageData._id);
    }
    setMessage("");
  };

  const deleteMessage = (id) => {
    axios.delete(`http://localhost:5000/api/discussions/${id}`).then((res) => {
      res.data;
    });
  };

  const handleChange = (e) => {
    setPost(e.target.value);
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
      {/* {discussion.length === 0 ? (
        <div
          style={{ justifySelf: "center", alignSelf: "center", height: "100%" }}
        >
          Loading...
        </div>
      ) : ( */}
      <div className="to-discuss">
        {messageReceived.map((messageContent) => {
          return (
            <Discuss
              id={id}
              key={messageContent._id}
              user={user}
              deleteMessage={deleteMessage}
              messageContent={messageContent}
            />
          );
        })}
      </div>
      {/* )} */}
      <div className="send-message">
        <hr style={{ width: "90%", marginBottom: "20px" }} />
        <WriteMessage
          handleChange={handleChange}
          sendMessage={sendMessage}
          post={post}
        />
      </div>
    </section>
  );
}
