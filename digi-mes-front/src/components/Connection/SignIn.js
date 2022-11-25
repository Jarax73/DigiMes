/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from "react";
import axios from "axios";
import { loginUrl, setUserToLocalStorage } from "../../address/UrlAddress";

export default function SignIn({ setSign }) {
  const logUser = (e) => {
    e.preventDefault();
    const userLog = {
      email: e.target.mail.value,
      password: e.target.password.value,
    };

    axios({
      method: "POST",
      url: loginUrl,
      data: userLog,
    })
      .then(async (response) => {
        if (response.data.success === true) window.location.href = "/";
        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        setUserToLocalStorage(response.data.user);
      })
      .catch((error) => error);
    e.target.reset();
  };

  return (
    <div className="sign">
      <div className="welcome">
        <form className="signin" onSubmit={logUser}>
          <label htmlFor="mail">E-mail</label>
          <input type="email" id="mail" name="mail" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit" className="sign-submit">
            Sign In
          </button>
          <p className="signup-appeal">
            Don’t have an account ?
            <p
              style={{ cursor: "pointer", color: "#1966FF", marginLeft: "2%" }}
              onClick={() => setSign(true)}
            >
              Sign up
            </p>
          </p>
        </form>
      </div>
    </div>
  );
}
