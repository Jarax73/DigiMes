import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";

export default function Discuss({
  discuss,
  deleteMessage,
  messageContent,
  user,
}) {
  Discuss.propTypes = {
    discuss: PropTypes.object,
    deleteMessage: PropTypes.func,
    messageContent: PropTypes.object,
    user: PropTypes.object,
  };
  const [isShown, setIsShown] = useState(false);

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
    <>
      {changeAndModify}
      <div
        className="discuss-border"
        onClick={handleMessage}
        id={messageContent.sender.id === user.id ? "me" : "other"}
      >
        <p style={{ alignSelf: "flex-end" }}>{messageContent.discussion}</p>
      </div>
    </>
  );
}
