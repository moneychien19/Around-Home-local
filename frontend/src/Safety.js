import React from "react";

const Safety = () => {
  let safetyData = [
    ["自行車竊案", "3件"],
    ["機車竊案", "5件"],
    ["汽車竊案", "2件"],
    ["住宅竊案", "1件"],
    ["隨機強盜案", "1件"],
    ["隨機搶奪案", "1件"],
    ["交通事故", "3件"],
  ];
  return (
    <div className="card" id="safety">
      <div className="title">
        <h3>治安</h3>
        <p>半年內發生的...</p>
      </div>
      <div className="table">
        <table>
          {safetyData.map((aRow) => (
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

export default Safety;
