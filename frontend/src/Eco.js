import React from "react";

const Eco = () => {
  let ecoData = [
    ["綠色友善餐廳", "5間"],
    ["綠色商店", "3間"],
    ["自備飲料杯優惠店家", "3間"],
    ["自備餐具優惠店家", "1間"],
    ["舊衣回收箱", "2個"],
    ["垃圾車停靠點", "2個"],
    ["公民營廢棄物清除機構", "1間"],
  ];
  return (
    <div className="card" id="eco">
      <div className="title">
        <h3>環保</h3>
        <p>1公里內...</p>
      </div>
      <div className="table">
        <table>
          {ecoData.map((aRow) => (
            <tr>
              {aRow.map((anItem) => (
                <td>{anItem}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Eco;
