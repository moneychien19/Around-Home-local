import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { distanceMapping } from "../rangeMapping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import "./Marker_Pin.css";

const Eco = ({ hidePins, setHidePins }) => {
  const showContent = useSelector((state) => state.inputReducer.showContent);
  const distanceRange = useSelector(
    (state) => state.inputReducer.distanceRange
  );

  const greenRes = useSelector((state) => state.ecoReducer.greenRes);
  const greenStore = useSelector((state) => state.ecoReducer.greenStore);
  const rewardRes = useSelector((state) => state.ecoReducer.rewardRes);
  const garbage = useSelector((state) => state.ecoReducer.garbage);
  const clothes = useSelector((state) => state.ecoReducer.clothes);
  const disposal = useSelector((state) => state.ecoReducer.disposal);

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
        <p>方圓{distanceMapping(distanceRange)}內的...</p>
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
            <td>{greenRes.length || 0} 間</td>
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
            <td>{greenStore.length || 0} 間</td>
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
            <td>{rewardRes.length || 0} 間</td>
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
            <td>{garbage.length || 0} 個</td>
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
            <td>{clothes.length || 0} 個</td>
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
            <td>{disposal.length || 0} 間</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Eco;
