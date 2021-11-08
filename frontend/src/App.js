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

  // data fetching
  let [theftRowData, setTheftRowData] = useState({
    自行車竊盜: 0,
    機車竊盜: 0,
    汽車竊盜: 0,
    住宅竊盜: 0,
    強盜: 0,
    搶奪: 0,
  });
  let [accidentRowData, setAccidentRowData] = useState({ 交通事故: 0 });

  return (
    <div className="App">
      <Form
        showContent={showContent}
        setShowContent={setShowContent}
        lat={lat}
        setLat={setLat}
        lng={lng}
        setLng={setLng}
        setTheftRowData={setTheftRowData}
        setAccidentRowData={setAccidentRowData}
      />
      {showContent[0] ? <Environment /> : null}

      {showContent[1] ? (
        showContent[2] ? (
          <div className="twoSide">
            <div className="left">
              <Eco />
            </div>
            <div className="right">
              <Safety
                theftRowData={theftRowData}
                accidentRowData={accidentRowData}
              />
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
            <Safety
              theftRowData={theftRowData}
              accidentRowData={accidentRowData}
            />
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
