import axios from "axios";
import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function SignIn(){
    const [user, setUser] = useState({});
    console.log(user);
    const logUser = (e) =>{
        e.preventDefault();
        const user = {
            email: e.target.mail.value,
            password: e.target.password.value
        }
        
        axios({
            method: "POST",
            url: "http://localhost:5000/api/auth/login",      
            data: user,
        })
        .then((response) => setUser(response.data))
        .catch((error) => error);
        e.target.reset();

    }

    return <div className='sign'>

    <div className='welcome'>
    
        <form className="signin" onSubmit={logUser} >
            <label htmlFor="mail">E-mail</label>
            <input type="email" id="mail" name="mail"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>
            <button type="submit" className="sign-submit">Sign In</button>
        <p className="signup-appeal" >Don’t have an account ? <Link to="/signup">Sign up</Link></p>
        </form>
        </div>
        </div>
}