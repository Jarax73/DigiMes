import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Jakaps from "./assets/jakaps.jpg";
import Home from "./components/Home";
import Menu from "./components/Menu";

export const AppContext = createContext();

function App() {
  return (
    <AppContext.Provider value={{ Jakaps }}>
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
