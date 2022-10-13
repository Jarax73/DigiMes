import React from "react"

export default function SignIn(){
    return <div className='sign'>

    <div className='welcome'>
    
        <form className="signin" >
            <label htmlFor="first">First-Name</label>
            <input type="text" id='first' name='first'/>
            <label htmlFor="lasst">Last-Name</label>
            <input type="text" id='first' name='first'/>
            <label htmlFor="mail">E-mail</label>
            <input type="email" id="mail" name="mail"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>            
            <button type="submit" className="sign-submit">Save</button>
        </form>
        </div>
        </div>
}