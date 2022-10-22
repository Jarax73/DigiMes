import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AppContext } from "../App";

export default function SignIn() {
  SignIn.propTypes = {
    shown: PropTypes.bool,
    setIsShown: PropTypes.func,
  };
  const { logUser } = useContext(AppContext);

  // console.log(shown);
  // const handleChange = () => {
  //   setIsShown(false);
  // };

  return (
    <div className="sign">
      <div className="welcome">
        {/* {shown ? ( */}
        <form className="signin" onSubmit={logUser}>
          <label htmlFor="mail">E-mail</label>
          <input type="email" id="mail" name="mail" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit" className="sign-submit">
            Sign In
          </button>
          <p className="signup-appeal">
            Don’t have an account ? <Link to="/signup">Sign up</Link>
          </p>
        </form>
        {/* ) : null} */}
      </div>
    </div>
  );
}
