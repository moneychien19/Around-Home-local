import React, { useEffect } from "react";
import { distanceMapping } from "../rangeMapping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import "./Marker_Pin.css";

const Eco = ({
  showContent,
  greenResRowData,
  greenStoreRowData,
  rewardResRowData,
  garbageRowData,
  clothesRowData,
  disposalRowData,
  distangeRange,
  hidePins,
  setHidePins,
}) => {
  useEffect(() => {
    document.querySelectorAll("input.pinIcon").forEach((el) => {
      if (hidePins[el.id] === true) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    });
  }, [showContent]);

  const checkHandler = (e) => {
    let key = e.target.id;
    let tempShow = JSON.parse(JSON.stringify(hidePins));
    if (tempShow[key] === true) {
      tempShow[key] = false;
    } else {
      tempShow[key] = true;
    }
    setHidePins(tempShow);
  };
  return (
    <div className="card" id="eco">
      <div className="title">
        <h3>環保</h3>
        <p>方圓{distanceMapping(distangeRange)}內的...</p>
      </div>
      <div className="table">
        <table>
          <tr>
            <td>
              <input
                type="checkbox"
                name=""
                className="pinIcon"
                id="hideGreenRes"
                onChange={checkHandler}
              />
              <label htmlFor="hideGreenRes">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin"
                  id="greenPin"
                  size="1x"
                />
              </label>
            </td>
            <td>綠色友善餐廳</td>
            <td>{greenResRowData} 間</td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                name=""
                className="pinIcon"
                id="hideGreenStore"
                onChange={checkHandler}
              />
              <label htmlFor="hideGreenStore">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin"
                  id="greenPin"
                  size="1x"
                />
              </label>
            </td>
            <td>綠色商店</td>
            <td>{greenStoreRowData} 間</td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                name=""
                className="pinIcon"
                id="hideRewardRes"
                onChange={checkHandler}
              />
              <label htmlFor="hideRewardRes">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin"
                  id="greenPin"
                  size="1x"
                />
              </label>
            </td>
            <td>自備餐具優惠店家</td>
            <td>{rewardResRowData} 間</td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                name=""
                className="pinIcon"
                id="hideGarbage"
                onChange={checkHandler}
              />
              <label htmlFor="hideGarbage">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin"
                  id="garbagePin"
                  size="1x"
                />
              </label>
            </td>
            <td>垃圾車停靠點</td>
            <td>{garbageRowData} 個</td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                name=""
                className="pinIcon"
                id="hideClothes"
                onChange={checkHandler}
              />
              <label htmlFor="hideClothes">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin"
                  id="garbagePin"
                  size="1x"
                />
              </label>
            </td>
            <td>舊衣回收箱</td>
            <td>{clothesRowData} 個</td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                name=""
                className="pinIcon"
                id="hideDisposal"
                onChange={checkHandler}
              />
              <label htmlFor="hideDisposal">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin"
                  id="garbagePin"
                  size="1x"
                />
              </label>
            </td>
            <td>公民營廢棄物清除機構</td>
            <td>{disposalRowData} 間</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Eco;
