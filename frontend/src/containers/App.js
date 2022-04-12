import { useState } from "react";
import { useSelector } from "react-redux";
import Form from "../components/Form";
import "./App.css";
import Environment from "../components/Environment";
import Eco from "../components/Eco";
import Safety from "../components/Safety";
import Map from "../components/Map";

function App() {
  // determine the show block
  const showContent = useSelector((state) => state.inputReducer.showContent);

  // data fetching
  let [AQIRowData, setAQIRowData] = useState([
    "空氣品質指標AQI",
    "",
    "",
    "",
    "",
  ]);
  let [UVRowData, setUVRowData] = useState(["紫外線指數", "", "", "", ""]);
  let [WQIRowData, setWQIRowData] = useState([
    "水庫水質卡爾森指數",
    "",
    "",
    "",
    "",
  ]);
  let [greenResLoc, setGreenResLoc] = useState([]);
  let [greenResRowData, setGreenResRowData] = useState(0);
  let [greenStoreLoc, setGreenStoreLoc] = useState([]);
  let [greenStoreRowData, setGreenStoreRowData] = useState(0);
  let [rewardResLoc, setRewardResLoc] = useState([]);
  let [rewardResRowData, setRewardResRowData] = useState(0);
  let [garbageRowData, setGarbageRowData] = useState(0);
  let [garbageLoc, setGarbageLoc] = useState([]);
  let [clothesRowData, setClothesRowData] = useState(0);
  let [clothesLoc, setClothesLoc] = useState([]);
  let [disposalRowData, setDisposalRowData] = useState(0);
  let [disposalLoc, setDisposalLoc] = useState([]);
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

  // define the pins should be showed or hid
  let [hidePins, setHidePins] = useState({
    hideGreenRes: false,
    hideGreenStore: false,
    hideRewardRes: false,
    hideGarbage: false,
    hideClothes: false,
    hideDisposal: false,
    hideTheft: false,
    hideAccident: false,
  });

  // define views
  let formView = (
    <Form
      setAQIRowData={setAQIRowData}
      setUVRowData={setUVRowData}
      setWQIRowData={setWQIRowData}
      setGreenResLoc={setGreenResLoc}
      setGreenResRowData={setGreenResRowData}
      setGreenStoreLoc={setGreenStoreLoc}
      setGreenStoreRowData={setGreenStoreRowData}
      setRewardResLoc={setRewardResLoc}
      setRewardResRowData={setRewardResRowData}
      setGarbageRowData={setGarbageRowData}
      setGarbageLoc={setGarbageLoc}
      setClothesRowData={setClothesRowData}
      setClothesLoc={setClothesLoc}
      setDisposalRowData={setDisposalRowData}
      setDisposalLoc={setDisposalLoc}
      setTheftRowData={setTheftRowData}
      setAccidentRowData={setAccidentRowData}
      setTheftLoc={setTheftLoc}
      setAccidentLoc={setAccidentLoc}
    />
  );
  let environmentView = (
    <Environment
      AQIRowData={AQIRowData}
      UVRowData={UVRowData}
      WQIRowData={WQIRowData}
    />
  );
  let ecoView = (
    <Eco
      greenResRowData={greenResRowData}
      greenStoreRowData={greenStoreRowData}
      rewardResRowData={rewardResRowData}
      garbageRowData={garbageRowData}
      clothesRowData={clothesRowData}
      disposalRowData={disposalRowData}
      hidePins={hidePins}
      setHidePins={setHidePins}
    />
  );
  let safetyView = (
    <Safety
      theftRowData={theftRowData}
      accidentRowData={accidentRowData}
      hidePins={hidePins}
      setHidePins={setHidePins}
    />
  );
  let mapView = (
    <Map
      greenResLoc={greenResLoc}
      greenStoreLoc={greenStoreLoc}
      rewardResLoc={rewardResLoc}
      garbageLoc={garbageLoc}
      clothesLoc={clothesLoc}
      disposalLoc={disposalLoc}
      theftLoc={theftLoc}
      accidentLoc={accidentLoc}
      hidePins={hidePins}
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
