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
  let formView = <Form />;
  let environmentView = <Environment />;
  let ecoView = <Eco hidePins={hidePins} setHidePins={setHidePins} />;
  let safetyView = <Safety hidePins={hidePins} setHidePins={setHidePins} />;
  let mapView = <Map hidePins={hidePins} />;

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
