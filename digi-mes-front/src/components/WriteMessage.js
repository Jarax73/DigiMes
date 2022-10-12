import React from "react";
import PropTypes from "prop-types";
import { AiOutlineSend } from "react-icons/ai";

export default function WriteMessage({ sendMessage, handleChange, post }) {
  WriteMessage.propTypes = {
    sendMessage: PropTypes.func,
    handleChange: PropTypes.func,
    post: PropTypes.string,
  };

  return (
    <form className="writing-container" onClick={sendMessage}>
      <input
        className="writing"
        type="text"
        placeholder="Write your Message"
        onChange={handleChange}
        value={post}
      />
      <button className="send-button">
        <AiOutlineSend style={{ fontSize: "150%", color: "#EAEAEA" }} />
      </button>
    </form>
  );
}
