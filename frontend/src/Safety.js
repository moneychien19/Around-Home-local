import React from "react";
import { distanceMapping, timeMapping } from "./rangeMapping";

const Safety = ({
  theftRowData,
  accidentRowData,
  distanceRange,
  timeRange,
}) => {
  return (
    <div className="card" id="safety">
      <div className="title">
        <h3>治安</h3>
        <p>
          方圓{distanceMapping(distanceRange)}中，{timeMapping(timeRange)}
          內發生的...
        </p>
      </div>
      <div className="table">
        <table>
          {Object.keys(theftRowData).map((aRowKey) => (
            <tr>
              <td>{aRowKey}</td>
              <td>{theftRowData[aRowKey]} 件</td>
            </tr>
          ))}
          <tr>
            <td>交通事故</td>
            <td>{accidentRowData["交通事故"]} 件</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Safety;
