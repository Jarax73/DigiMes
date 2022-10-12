import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
// import Menu from "./components/Menu";
import Welcome from "./components/Welcome";

export const AppContext = createContext();

function App() {
  const [discussion, setDiscussion] = useState([]);
  return (
    <AppContext.Provider value={{ Jakaps, discussion, setDiscussion }}>
      <div className="container"> 
        {/* <Menu /> */}
        <Routes>
        
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="/signin" element={<SignIn/>}/>
          <Route exact path="/" element={<Home />} />
          
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
