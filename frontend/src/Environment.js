import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Environment = ({ AQIRowData, UVRowData, WQIRowData }) => {
  const header = ["", "指標", "鄰近測站", "測量時間", "數值", "狀態"];

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
                      AQIRowData[4] === "良好"
                        ? "good"
                        : AQIRowData[4] === "普通"
                        ? "normal"
                        : "danger"
                    }
                  />
                </td>
                {AQIRowData.map((anItem) => (
                  <td>{anItem}</td>
                ))}
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon
                    className="light"
                    icon={faCircle}
                    id={
                      UVRowData[4] === "低量級"
                        ? "good"
                        : UVRowData[4] === "中量級"
                        ? "normal"
                        : "danger"
                    }
                  />
                </td>
                {UVRowData.map((anItem) => (
                  <td>{anItem}</td>
                ))}
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon
                    className="light"
                    icon={faCircle}
                    id={
                      WQIRowData[4] === "貧養"
                        ? "good"
                        : WQIRowData[4] === "普養"
                        ? "normal"
                        : "danger"
                    }
                  />
                </td>
                {WQIRowData.map((anItem) => (
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
