/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from "react";
import axios from "axios";

export default function SignIn({ setSign }) {
  const logUser = (e) => {
    e.preventDefault();
    const userLog = {
      email: e.target.mail.value,
      password: e.target.password.value,
    };

    axios({
      method: "POST",
      url:
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_PROD_API_URL}api/auth/login`
          : `${process.env.REACT_APP_DEV_API_URL}api/auth/login`,
      data: userLog,
    })
      .then(async (response) => {
        if (response.data.success === true) window.location.href = "/";
        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
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
            Don’t have an account ?{" "}
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
