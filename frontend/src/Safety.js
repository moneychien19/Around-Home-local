import React from "react";
import { distanceMapping, timeMapping } from "./rangeMapping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import "./Marker_Pin.css";

const Safety = ({
  theftRowData,
  accidentRowData,
  distanceRange,
  timeRange,
  showPins,
  setShowPins,
}) => {
  const checkHandler = (e) => {
    let key = e.target.id;
    let tempShow = JSON.parse(JSON.stringify(showPins));

    // control the other pins in the content
    let controlledPins;
    if (key === "showTheft") {
      controlledPins = document.querySelectorAll(".controlled#theftPin");
    }
    if (key === "showAccident") {
      controlledPins = document.querySelectorAll(".controlled#accidentPin");
    }
    controlledPins.forEach((el) => {
      if (tempShow[key] === false) {
        el.style = "opacity: 0.3";
      } else {
        el.style = "opacity: 1";
      }
    });

    // set the state
    if (tempShow[key] === true) {
      tempShow[key] = false;
    } else {
      tempShow[key] = true;
    }
    setShowPins(tempShow);
  };

  return (
    <div className="card" id="safety">
      <div className="title">
        <h3>治安</h3>
        <p>
          方圓{distanceMapping(distanceRange)}中，{timeMapping(timeRange)}
          內發生的...
        </p>
      </div>
      <div className="checkbox">
        <div className="checkTheft">
          <input
            type="checkbox"
            name=""
            id="showTheft"
            onChange={checkHandler}
          />
          <label htmlFor="showTheft">
            <FontAwesomeIcon
              icon={faMapPin}
              className="pin"
              id="theftPin"
              size="1x"
            />
          </label>
          <p>竊盜案件</p>
          <br />
        </div>
        <div className="checkAccident">
          <input
            type="checkbox"
            name=""
            id="showAccident"
            onChange={checkHandler}
          />
          <label htmlFor="showAccident">
            <FontAwesomeIcon
              icon={faMapPin}
              className="pin"
              id="accidentPin"
              size="1x"
            />
          </label>
          <p>交通事故</p>
          <br />
        </div>
      </div>
      <div className="table">
        <table>
          {Object.keys(theftRowData).map((aRowKey) => (
            <tr>
              <td>
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin controlled"
                  id="theftPin"
                  size="1x"
                />
              </td>
              <td>{aRowKey}</td>
              <td>{theftRowData[aRowKey]} 件</td>
            </tr>
          ))}
          <tr>
            <td>
              <FontAwesomeIcon
                icon={faMapPin}
                className="pin controlled"
                id="accidentPin"
                size="1x"
              />
            </td>
            <td>交通事故</td>
            <td>{accidentRowData["交通事故"]} 件</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Safety;
