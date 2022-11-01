import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";
import { AppContext } from "../App";

export default function Discuss({ discuss, deleteMessage, message }) {
  Discuss.propTypes = {
    discuss: PropTypes.object,
    deleteMessage: PropTypes.func,
    message: PropTypes.object,
    user: PropTypes.object,
  };
  const [isShown, setIsShown] = useState(false);
  const { user } = useContext(AppContext);

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
        id={message.sender.id === user.id ? "me" : "other"}
      >
        <p style={{ alignSelf: "flex-end" }}>{message.discussion}</p>
      </div>
    </>
  );
}
