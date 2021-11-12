import React from "react";

const Safety = ({ theftRowData, accidentRowData }) => {
  return (
    <div className="card" id="safety">
      <div className="title">
        <h3>治安</h3>
        <p>半年內發生的...</p>
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
