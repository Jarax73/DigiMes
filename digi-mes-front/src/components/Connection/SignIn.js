/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState } from "react";
import axios from "axios";
import { loginUrl, setUserToLocalStorage } from "../../address/UrlAddress";

export default function SignIn({ setSign }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // const validateMail = () =>{
  //   if(mail < 3) return setError()
  // }
  const logUser = (e) => {
    e.preventDefault();
    const userLog = {
      email: mail < 3 ? setErrorMail("Le mail saisit n'est pas correct") : mail,
      password:
        password < 3
          ? setErrorPassword("Le mot de passe saisit n'est pas correct")
          : password,
    };

    axios({
      method: "POST",
      url: loginUrl,
      data: userLog,
    })
      .then(async (response) => {
        console.log("reponse", response.data);
        if (response.data.success === true) window.location.href = "/";
        window.localStorage.setItem("token", response.data.token.split(" ")[1]);
        setUserToLocalStorage(response.data.user);
      })
      .catch((error) => error);
    e.target.reset();
  };
  // console.log(mail);
  // console.log(password);

  return (
    <div className="sign">
      <div className="welcome">
        <form className="signin" onSubmit={logUser}>
          <label htmlFor="mail">E-mail</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <p style={{ color: "red", fontSize: "11px" }}>{errorMail}</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ color: "red", fontSize: "11px" }}>{errorPassword}</p>
          <button type="submit" className="sign-submit">
            Sign In
          </button>
          <div className="signup-appeal">
            Don’t have an account ?
            <p
              style={{ cursor: "pointer", color: "#1966FF", marginLeft: "2%" }}
              onClick={() => setSign(true)}
            >
              Sign up
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
