import react, { useState } from "react";
import Form from "./Form";
import logo from "./logo.svg";
import "./App.css";
import Environment from "./Environment";
import Eco from "./Eco";
import Safety from "./Safety";
import Map from "./Map";
import useFetch from "./useFetch";

function App() {
  // determine the show block
  let [showContent, setShowContent] = useState([false, false, false]);
  let [lat, setLat] = useState(25.014947);
  let [lng, setLng] = useState(121.535549);

  // example of fetching
  const { data, loading, error } = useFetch("https://v2.jokeapi.dev/joke/Any");
  if (error) {
    console.log(error);
  }

  return (
    <div className="App">
      {/* example of fetching */}
      {/* <h1>{data?.setup}</h1>
      <h2>{data?.delivery}</h2> */}

      <Form
        showContent={showContent}
        setShowContent={setShowContent}
        setLat={setLat}
        setLng={setLng}
      />
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
              <Map lat={lat} lng={lng} />
            </div>
            <div className="right">
              <Eco />
            </div>
          </div>
        )
      ) : showContent[2] ? (
        <div className="twoSide">
          <div className="left">
            <Map lat={lat} lng={lng} />
          </div>
          <div className="right">
            <Safety />
          </div>
        </div>
      ) : null}
      {showContent[1] === showContent[2] ? (
        <div className="whole">
          <Map lat={lat} lng={lng} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
