import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Environment = () => {
  const header = ["", "指標", "鄰近測站", "測量時間", "數值", "狀態"];
  const AQI = useSelector((state) => state.envReducer.AQI);
  const UV = useSelector((state) => state.envReducer.UV);

  return (
    <div className="whole">
      <div className="card" id="environment">
        <div className="title">
          <h3>環境指標</h3>
          <p>距離最近的測站最新的測量值</p>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                {header.map((item) => (
                  <td>{item}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon
                    className="light"
                    icon={faCircle}
                    id={
                      AQI[4] === "良好"
                        ? "good"
                        : AQI[4] === "普通"
                        ? "normal"
                        : "danger"
                    }
                  />
                </td>
                {AQI.map((anItem) => (
                  <td>{anItem}</td>
                ))}
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon
                    className="light"
                    icon={faCircle}
                    id={
                      UV[4] === "低量級"
                        ? "good"
                        : UV[4] === "中量級"
                        ? "normal"
                        : "danger"
                    }
                  />
                </td>
                {UV.map((anItem) => (
                  <td>{anItem}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Environment;
