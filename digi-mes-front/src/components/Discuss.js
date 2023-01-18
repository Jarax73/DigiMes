/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AppContext } from "../context/AppContext";

export default function Discuss({ discuss, deleteMessage, message }) {
  const [isShown, setIsShown] = useState(false);
  const { user } = useContext(AppContext);

  // console.log(message?.discussion.charCodeAt(0));
  // console.log(message?.discussion);

  const handleMessage = () => {
    setIsShown((current) => !current);
  };
  const changeAndModify = isShown && (
    <div
      style={{
        display: "flex",
        marginBottom: "-10px",
      }}
    >
      <AiFillDelete
        style={{ marginRight: "5px" }}
        onClick={() => deleteMessage(discuss._id)}
      />
    </div>
  );

  return (
    <div className={message?.sender === user._id ? "me" : "other"}>
      {changeAndModify}
      <div
        className="discuss-border"
        onClick={handleMessage}
        id={message?.sender === user._id ? "me" : "other"}
      >
        <p style={{ alignSelf: "flex-end" }}>{message?.discussion}</p>
      </div>
      <div
        id={message?.sender === user._id ? "me-triangle" : "other-triangle"}
      ></div>
      <p style={{ marginTop: "2%", fontSize: "14px" }}>{message?.time}</p>
    </div>
  );
}
