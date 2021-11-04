import React from "react";

const Environment = () => {
  const header = ["指標", "鄰近測站", "數值", "狀態"];
  let environmentData = [
    ["空氣品質指標AQI", "新北市-永和", 37, "良好"],
    ["紫外線指數", "新北市-板橋", 6, "高量級"],
    ["水庫水質卡爾森指數", "翡翠水庫", 52, "優氧"],
    ["河川汙染指數", "淡水河-中正橋", 4.5, "中度汙染"],
  ];

  return (
    <div className="whole">
      <div className="card" id="environment">
        <div className="title">
          <h3>環境指標</h3>
          <p>現在的...</p>
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
              {environmentData.map((aRow) => (
                <tr>
                  {aRow.map((anItem) => (
                    <td>{anItem}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Environment;
