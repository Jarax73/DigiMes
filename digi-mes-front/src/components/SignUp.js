import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function SignUp() {
  const { setSign } = useContext(AppContext);
  const createUser = (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.first.value,
      lastName: e.target.last.value,
      email: e.target.mail.value,
      password: e.target.password.value,
      imageUrl: "",
      messages: [],
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/register",
      data: user,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) window.location.href = "/";
        else alert("Oups");
      })
      .catch((error) => error);
    e.target.reset();
  };

  return (
    <div className="sign">
      <div className="welcome">
        <form className="signin" onSubmit={createUser}>
          <label htmlFor="first">First-Name</label>
          <input type="text" id="first" name="first" />
          <label htmlFor="last">Last-Name</label>
          <input type="text" id="last" name="last" />
          <label htmlFor="mail">E-mail</label>
          <input type="email" id="mail" name="mail" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit" className="sign-submit">
            Save
          </button>
          <p className="signup-appeal">
            Back to
            <p
              style={{ cursor: "pointer", color: "#1966FF", marginLeft: "2%" }}
              onClick={() => setSign(false)}
            >
              Sign in
            </p>
          </p>
        </form>
      </div>
    </div>
  );
}
