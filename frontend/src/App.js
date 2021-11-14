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

  // define the fetching variables
  let [lat, setLat] = useState(25.014947);
  let [lng, setLng] = useState(121.535549);
  let [distanceRange, setDistanceRange] = useState("1000");
  let [timeRange, setTimeRange] = useState("6");

  // data fetching
  let [AQIRowData, setAQIRowData] = useState(["空氣品質指標AQI", "", "", ""]);
  let [UVRowData, setUVRowData] = useState(["紫外線指數", "", "", ""]);
  let [theftRowData, setTheftRowData] = useState({
    自行車竊盜: 0,
    機車竊盜: 0,
    汽車竊盜: 0,
    住宅竊盜: 0,
    強盜: 0,
    搶奪: 0,
  });
  let [theftLoc, setTheftLoc] = useState([]);
  let [accidentRowData, setAccidentRowData] = useState({ 交通事故: 0 });
  let [accidentLoc, setAccidentLoc] = useState([]);

  // define views
  let formView = (
    <Form
      showContent={showContent}
      setShowContent={setShowContent}
      lat={lat}
      setLat={setLat}
      lng={lng}
      setLng={setLng}
      distanceRange={distanceRange}
      setDistanceRange={setDistanceRange}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      setAQIRowData={setAQIRowData}
      setUVRowData={setUVRowData}
      setTheftRowData={setTheftRowData}
      setAccidentRowData={setAccidentRowData}
      setTheftLoc={setTheftLoc}
      setAccidentLoc={setAccidentLoc}
    />
  );
  let environmentView = (
    <Environment AQIRowData={AQIRowData} UVRowData={UVRowData} />
  );
  let ecoView = <Eco />;
  let safetyView = (
    <Safety
      theftRowData={theftRowData}
      accidentRowData={accidentRowData}
      distanceRange={distanceRange}
      timeRange={timeRange}
    />
  );
  let mapView = (
    <Map
      lat={lat}
      lng={lng}
      theftLoc={theftLoc}
      accidentLoc={accidentLoc}
      distanceRange={distanceRange}
    />
  );

  return (
    <div className="App">
      {formView}

      {showContent[0] ? environmentView : null}

      {showContent[1] ? (
        showContent[2] ? (
          <div className="twoSide">
            <div className="left">{ecoView}</div>
            <div className="right">{safetyView}</div>
          </div>
        ) : (
          <div className="twoSide">
            <div className="left">{mapView}</div>
            <div className="right">{ecoView}</div>
          </div>
        )
      ) : showContent[2] ? (
        <div className="twoSide">
          <div className="left">{mapView}</div>
          <div className="right">{safetyView}</div>
        </div>
      ) : null}
      {showContent[1] === showContent[2] ? (
        <div className="whole">{mapView}</div>
      ) : null}
    </div>
  );
}

export default App;
