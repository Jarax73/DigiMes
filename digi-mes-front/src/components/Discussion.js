import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
// import { response } from "../../../digi-mes-back/app";
import { AppContext } from "../App";

export default function Discussion() {
  const { Jakaps } = useContext(AppContext);
  const [discussion, setDiscussion] = useState([]);

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

  const sendMessage = () => {};

  console.log(discussion);
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
      <div className="to-discuss">
        {!discussion
          ? []
          : discussion.map((discuss) => (
              <div className="discuss-style" key={discuss._id}>
                <div className="discuss-border">
                  <p>{discuss.discussion}</p>
                </div>
              </div>
            ))}
      </div>
      <div className="send-message">
        <hr style={{ width: "90%", marginBottom: "20px" }} />
        <form className="writing-container" onClick={sendMessage}>
          <input
            className="writing"
            type="text"
            placeholder="Write your Message"
          />
          <div className="send-button">
            <AiOutlineSend style={{ fontSize: "150%", color: "#EAEAEA" }} />
          </div>
        </form>
      </div>
    </section>
  );
}
