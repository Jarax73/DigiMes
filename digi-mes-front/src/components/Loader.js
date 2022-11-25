import React from "react";
import LoaderImage from "../assets/loader.gif";

export default function Loader() {
  return (
    <div
      style={{
        height: "95vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: "0",
        margin: "0",
      }}
    >
      <img style={{ width: "40px" }} src={LoaderImage} />
    </div>
  );
}
