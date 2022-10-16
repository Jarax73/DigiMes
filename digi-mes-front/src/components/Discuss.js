import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";

export default function Discuss({ discuss, deleteMessage, messageReceived }) {
  Discuss.propTypes = {
    discuss: PropTypes.object,
    deleteMessage: PropTypes.func,
    messageReceived: PropTypes.string,
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
      <div className="discuss-border" onClick={handleMessage}>
        <p>{messageReceived}</p>
      </div>
    </>
  );
}
