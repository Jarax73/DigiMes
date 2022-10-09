import React from "react";
// import { CiSearch } from "react-icon/ci";

function App() {
  return (
    <div className="container">
      <nav className="menu">
        <div className="image-user">
          <img src="img.jpg" alt="user" />
        </div>
      </nav>
      <section className="users">
        <div className="search-user">
          <input type="search" />
        </div>
        <div className="users-discuss">
          <h1 style={{ paddingLeft: "20px" }}>Recent</h1>
          <div className="conversation">
            <div className="conversation-img">
              <img src="img.jpg" alt="user" />
            </div>
            <div className="info-conversation">
              <h3>Raghav</h3>
              <p>Message</p>
            </div>
          </div>
          <hr style={{ width: "90%" }}></hr>
          <div className="conversation">
            <div className="conversation-img">
              <img src="img.jpg" alt="user" />
            </div>
            <div className="info-conversation">
              <h3>Raghav</h3>
              <p>Message</p>
            </div>
          </div>
          <hr style={{ width: "90%" }}></hr>
          <div className="conversation">
            <div className="conversation-img">
              <img src="img.jpg" alt="user" />
            </div>
            <div className="info-conversation">
              <h3>Raghav</h3>
              <p>Message</p>
            </div>
          </div>
          <hr style={{ width: "90%" }}></hr>
        </div>
      </section>
      <section className="discuss">
        <header className="discuss-head">
          <div className="conversation-img">
            <img src="img.jpg" alt="user" />
          </div>
          <div className="info-conversation">
            <h3>Raghav</h3>
            <p>Online</p>
          </div>
        </header>
        <hr style={{ width: "90%" }}></hr>
      </section>
    </div>
  );
}

export default App;
