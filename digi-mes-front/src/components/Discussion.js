import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { response } from "../../../digi-mes-back/app";
import { AppContext } from "../App";
import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";

export default function Discussion() {
  const { Jakaps, discussion, setDiscussion, messageReceived } =
    useContext(AppContext);

  const [post, setPost] = useState("");
  const [id, setId] = useState("");

  const userToPost = {
    discussion: post,
  };
  console.log(messageReceived);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/discussions/", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then((response) => setDiscussion(response.data));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/api/discussions",

      data: userToPost,
    })
      .then((response) => response)
      .catch((error) => error);
    setPost("");
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
          <h3>Raghav</h3>
          <p>Online</p>
        </div>
      </header>
      <hr style={{ width: "90%" }} />
      {discussion.length === 0 ? (
        <div
          style={{ justifySelf: "center", alignSelf: "center", height: "100%" }}
        >
          Loading...
        </div>
      ) : (
        <div className="to-discuss">
          {/* {discussion.map((discuss) => ( */}
          <div
            className="discuss-style"
            // key={discuss._id}
          >
            <Discuss
              // discuss={discuss}
              id={id}
              setId={setId}
              deleteMessage={deleteMessage}
              messageReceived={messageReceived}
            />
          </div>
          {/* ))} */}
        </div>
      )}
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
