import React from "react";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";
import { Outlet } from "react-router-dom";

export default function Welcome() {
  // const [shown, setIsShown] = useState(true);
  return (
    <div className="sign">
      <div className="welcome">
        <div className="introduction">
          Bienvenue dans notre application de messagerie <br />
          DigiMes
        </div>
        {/* {shown ? <SignIn shown={shown} setIsShown={setIsShown} /> : <SignUp />} */}
        <Outlet />
      </div>
    </div>
  );
}
