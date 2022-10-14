import React from 'react';
import SignIn from './SignIn';
// import SignUp from './SignUp';

export default function Welcome(){
    return <div className='sign'>

    <div className='welcome'>
         <div className="introduction" >Bienvenue dans notre application de messagerie <br/>
        DigiMes</div>
        <SignIn/>
        {/* <SignUp /> */}
    </div> 
    </div>
}