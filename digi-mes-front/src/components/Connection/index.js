import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Connection() {
  const [sign, setSign] = useState(false);

  return (
    <div className="sign">
      <div className="welcome">
        <div className="introduction">
          Bienvenue dans notre application de messagerie <br />
          DigiMes
        </div>
        {sign === false ? (
          <SignIn setSign={setSign} />
        ) : (
          <SignUp setSign={setSign} />
        )}
      </div>
    </div>
  );
}
