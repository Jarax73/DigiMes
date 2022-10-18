import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function UserConversation() {
  const { Jakaps, userToChat } = useContext(AppContext);
  // const { id } = useParams();
  // console.log(id);
  return (
    <div className="users-discuss">
      {userToChat.length === 0 ? (
        <div>loading...</div>
      ) : (
        userToChat.map((chatRoom) => {
          return (
            <Link
              to={`/discussions/${chatRoom._id}`}
              style={{ textDecoration: "none" }}
              key={chatRoom._id}
            >
              <div className="conversation">
                <div className="conversation-img">
                  <img className="user-avatar" src={Jakaps} alt="user" />
                </div>
                <div className="info-conversation">
                  <h3>
                    {chatRoom.firstName} {chatRoom.lastName}{" "}
                  </h3>
                  <p>Message</p>
                </div>
              </div>
            </Link>
          );
        })
      )}
      <h1 style={{ paddingLeft: "20px" }}>Recent</h1>
      <div className="conversation">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>Raghav</h3>
          <p>Message</p>
        </div>
      </div>
      <hr style={{ width: "90%" }}></hr>
      <div className="conversation">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>Raghav</h3>
          <p>Message</p>
        </div>
      </div>
      <hr style={{ width: "90%" }}></hr>
      <div className="conversation">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>Raghav</h3>
          <p>Message</p>
        </div>
      </div>
      <hr style={{ width: "90%" }}></hr>
    </div>
  );
}
