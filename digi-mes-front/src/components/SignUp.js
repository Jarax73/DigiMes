/* eslint-disable no-undef */
import axios from "axios";
import React from "react";

export default function SignUp() {
  const createUser = (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.first.value,
      lastName: e.target.last.value,
      email: e.target.mail.value,
      password: e.target.password.value,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/register",
      data: user,
    })
      .then(async (response) => {
        console.log(response);
        if (response.data.success === true) {
          window.location.href = "/";
        }
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
        </form>
      </div>
    </div>
  );
}
