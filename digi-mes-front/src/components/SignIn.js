import React from "react"
import { Link } from "react-router-dom"

export default function SignIn(){
    return <div className='sign'>

    <div className='welcome'>
    
        <form className="signin" >
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