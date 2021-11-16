import React from "react";
import { distanceMapping } from "./rangeMapping";

const Eco = ({
  greenResRowData,
  greenStoreRowData,
  rewardResRowData,
  rewardStoreRowData,
  garbageRowData,
  clothesRowData,
  disposalRowData,
  distangeRange,
}) => {
  return (
    <div className="card" id="eco">
      <div className="title">
        <h3>環保</h3>
        <p>方圓{distanceMapping(distangeRange)}內的...</p>
      </div>
      <div className="table">
        <table>
          <tr>
            <td>綠色友善餐廳</td>
            <td>{greenResRowData} 間</td>
          </tr>
          <tr>
            <td>綠色商店</td>
            <td>{greenStoreRowData} 間</td>
          </tr>
          <tr>
            <td>自備餐具優惠店家</td>
            <td>{rewardResRowData} 間</td>
          </tr>
          <tr>
            <td>自備飲料杯優惠店家</td>
            <td>{rewardStoreRowData} 間</td>
          </tr>
          <tr>
            <td>垃圾車停靠點</td>
            <td>{garbageRowData} 個</td>
          </tr>
          <tr>
            <td>舊衣回收箱</td>
            <td>{clothesRowData} 個</td>
          </tr>
          <tr>
            <td>公民營廢棄物清除機構</td>
            <td>{disposalRowData} 間</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Eco;
