import React from "react";

const Environment = ({ AQIRowData, UVRowData, WQIRowData }) => {
  const header = ["指標", "鄰近測站", "數值", "狀態", "測量時間"];

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
                {AQIRowData.map((anItem) => (
                  <td>{anItem}</td>
                ))}
              </tr>
              <tr>
                {UVRowData.map((anItem) => (
                  <td>{anItem}</td>
                ))}
              </tr>
              <tr>
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
