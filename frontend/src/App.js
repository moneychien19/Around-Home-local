import react, { useState } from "react";
import Form from "./Form";
import logo from "./logo.svg";
import "./App.css";
import Environment from "./Environment";
import Eco from "./Eco";
import Safety from "./Safety";
import Map from "./Map";

function App() {
  // determine the show block
  let [showContent, setShowContent] = useState([false, false, false]);

  return (
    <div className="App">
      <Form showContent={showContent} setShowContent={setShowContent} />
      {showContent[0] ? <Environment /> : null}

      {showContent[1] ? (
        showContent[2] ? (
          <div className="twoSide">
            <div className="left">
              <Eco />
            </div>
            <div className="right">
              <Safety />
            </div>
          </div>
        ) : (
          <div className="twoSide">
            <div className="left">
              <Map />
            </div>
            <div className="right">
              <Eco />
            </div>
          </div>
        )
      ) : showContent[2] ? (
        <div className="twoSide">
          <div className="left">
            <Map />
          </div>
          <div className="right">
            <Safety />
          </div>
        </div>
      ) : null}
      {showContent[1] === showContent[2] ? (
        <div className="whole">
          <Map />
        </div>
      ) : null}
    </div>
  );
}

export default App;
