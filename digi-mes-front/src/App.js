import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Menu from "./components/Menu";
import Welcome from "./components/Welcome";

export const AppContext = createContext();

function App() {
  const [discussion, setDiscussion] = useState([]);
  const [token, setToken] = useState('');
  useEffect(()=>{
    setToken(token);

  }, [])
  return (
    <AppContext.Provider value={{ Jakaps, discussion, setDiscussion }}>
      <div className="container"> 
        {!token ? <Welcome/> :
        <>
        <Menu />
        <Routes>
        
        <Route path="/signup" element={<SignUp/>}/>
          <Route exact path="/" element={<Home />} />
          
        </Routes>
        </>
        }
      </div>
    </AppContext.Provider>
  );
}

export default App;
