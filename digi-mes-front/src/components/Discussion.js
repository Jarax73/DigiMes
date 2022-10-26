import React, { useContext } from "react";
// import axios from "axios";
import { AppContext } from "../App";
// import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";

export default function Discussion() {
  const { Jakaps, oneUser } = useContext(AppContext);

  // const deleteMessage = (id) => {
  //   axios.delete(`http://localhost:5000/api/discussions/${id}`).then((res) => {
  //     res.data;
  //   });
  // };

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
        {/* {messageReceived.map((messageContent) => {
          return (
            <Discuss
              id={id}
              key={messageContent._id}
              user={user}
              deleteMessage={deleteMessage}
              messageContent={messageContent}
            />
          );
        })} */}
        Non
      </div>
      <div className="send-message">
        <hr style={{ width: "90%", marginBottom: "20px" }} />
        <WriteMessage />
      </div>
    </section>
  );
}
