import React from "react";
import { distanceMapping } from "./rangeMapping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import "./Marker_Pin.css";

const Eco = ({
  greenResRowData,
  greenStoreRowData,
  rewardResRowData,
  rewardStoreRowData,
  garbageRowData,
  clothesRowData,
  disposalRowData,
  distangeRange,
  showPins,
  setShowPins,
}) => {
  const checkHandler = (e) => {
    let key = e.target.id;
    let tempShow = JSON.parse(JSON.stringify(showPins));
    if (tempShow[key] === true) {
      tempShow[key] = false;
    } else {
      tempShow[key] = true;
    }
    setShowPins(tempShow);
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
                id="showGreenRes"
                onChange={checkHandler}
              />
              <label htmlFor="showGreenRes">
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
                id="showGreenStore"
                onChange={checkHandler}
              />
              <label htmlFor="showGreenStore">
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
                id="showRewardRes"
                onChange={checkHandler}
              />
              <label htmlFor="showRewardRes">
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
                id="showRewardStore"
                onChange={checkHandler}
              />
              <label htmlFor="showRewardStore">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="pin"
                  id="greenPin"
                  size="1x"
                />
              </label>
            </td>
            <td>自備飲料杯優惠店家</td>
            <td>{rewardStoreRowData} 間</td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                name=""
                id="showGarbage"
                onChange={checkHandler}
              />
              <label htmlFor="showGarbage">
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
                id="showClothes"
                onChange={checkHandler}
              />
              <label htmlFor="showClothes">
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
                id="showDisposal"
                onChange={checkHandler}
              />
              <label htmlFor="showDisposal">
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
