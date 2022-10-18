import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";

export default function Discussion() {
  const {
    Jakaps,
    // discussion,
    message,
    setMessage,
    // setDiscussion,
    messageReceived,
    setMessageReceived,
    socket,
    user,
  } = useContext(AppContext);

  const [post, setPost] = useState("");
  const [id, setId] = useState("");
  // const [showMessage, setShowMessage] = useState([]);

  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/api/discussions/", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-type": "application/json",
    //     },
    //   })
    //   .then((response) => setDiscussion(response.data));

    socket.current.on("receive_message", (data) => {
      setMessageReceived((list) => [...list, data]);
    });

    // setShowMessage(messageReceived);
  }, []);

  // console.log(messageReceived);
  // console.log(showMessage);
  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: "POST",
  //     url: "http://localhost:5000/api/discussions",

  //     data: userToPost,
  //   })
  //     .then((response) => response)
  //     .catch((error) => error);
  //   setPost("");
  // };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = {
        room: "",
        sender: user.id,
        username: user.firstName + " " + user.lastName,
        message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.current.emit("send_message", messageData);
      setMessageReceived((list) => [...list, messageData]);
    }
    setMessage("");
  };
  console.log(messageReceived);

  const deleteMessage = (id) => {
    axios.delete(`http://localhost:5000/api/discussions/${id}`).then((res) => {
      res.data;
    });
  };
  console.log(socket.current);
  console.log(user.id);

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
          <h3>Raghav</h3>
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
              setId={setId}
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
