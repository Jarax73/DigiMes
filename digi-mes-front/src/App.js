import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import Menu from "./components/Menu";

export const AppContext = createContext();

function App() {
  const [discussion, setDiscussion] = useState([]);
  return (
    <AppContext.Provider value={{ Jakaps, discussion, setDiscussion }}>
      <div className="container">
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
