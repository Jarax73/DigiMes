/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import Home from "./components/Home";
import Menu from "./components/Menu";
import { AppContext } from "./context/AppContext";
import Loader from "./components/Loader";
import Connection from "./components/Connection";

function App() {
  const [loader, setLoader] = useState(true);
  const { token } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="container">
      {!token ? (
        <Connection />
      ) : (
        <>
          <Menu />
          <Home />
        </>
      )}
    </div>
  );
}

export default App;
