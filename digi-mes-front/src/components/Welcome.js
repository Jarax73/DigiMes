import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Welcome() {
  const [shown, setIsShown] = useState(true);
  return (
    <div className="sign">
      <div className="welcome">
        <div className="introduction">
          Bienvenue dans notre application de messagerie <br />
          DigiMes
        </div>
        {shown ? <SignIn shown={shown} setIsShown={setIsShown} /> : <SignUp />}
      </div>
    </div>
  );
}
