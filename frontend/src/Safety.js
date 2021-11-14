import React from "react";

const Safety = ({
  theftRowData,
  accidentRowData,
  distanceRange,
  timeRange,
}) => {
  const distanceMapping = (distanceRange) => {
    if (distanceRange === "500") {
      return "500公尺";
    } else {
      return String(Number(distanceRange) / 1000) + "公里";
    }
  };

  const timeMapping = (timeRange) => {
    if (timeRange === "1") {
      return "一個月";
    } else if (timeRange === "3") {
      return "三個月";
    } else if (timeRange === "6") {
      return "半年";
    } else if (timeRange === "12") {
      return "一年";
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
