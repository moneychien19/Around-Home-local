import React, { useEffect } from "react";
import { distanceMapping, timeMapping } from "./rangeMapping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import "./Marker_Pin.css";

const Safety = ({
  showContent,
  theftRowData,
  accidentRowData,
  distanceRange,
  timeRange,
  hidePins,
  setHidePins,
}) => {
  useEffect(() => {
    document.querySelectorAll("input.pinIcon").forEach((icon) => {
      let key = icon.id;
      if (hidePins[key] === true) {
        icon.checked = true;
      } else {
        icon.checked = false;
      }
      control(key, hidePins);
    });
  }, [showContent]);

  const checkHandler = (e) => {
    let key = e.target.id;

    // set the state
    let tempShow = JSON.parse(JSON.stringify(hidePins));
    if (tempShow[key] === true) {
      tempShow[key] = false;
    } else {
      tempShow[key] = true;
    }
    setHidePins(tempShow);
    control(key, tempShow);
  };

  const control = (key, hideList) => {
    // control the other pins in the content
    let controlledTheft = document.querySelectorAll(".controlled#theftPin");
    let controlledAccident = document.querySelectorAll(
      ".controlled#accidentPin"
    );
    if (key === "hideTheft") {
      if (hideList[key] === true) {
        controlledTheft.forEach((el) => (el.style = "opacity: 0.3"));
      } else {
        controlledTheft.forEach((el) => (el.style = "opacity: 1"));
      }
    } else if (key === "hideAccident") {
      if (hideList[key] === true) {
        controlledAccident.forEach((el) => (el.style = "opacity: 0.3"));
      } else {
        controlledAccident.forEach((el) => (el.style = "opacity: 1"));
      }
    }
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
            className="pinIcon"
            id="hideTheft"
            onChange={checkHandler}
          />
          <label htmlFor="hideTheft">
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
            className="pinIcon"
            id="hideAccident"
            onChange={checkHandler}
          />
          <label htmlFor="hideAccident">
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
