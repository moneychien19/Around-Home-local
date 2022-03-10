const baseUrl = "http://52.192.204.99:8000/api/environment/";

let fetchAQI = (lat, lng, setAQIRowData) => {
  fetch(baseUrl + "air-quality", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }
      return res.json();
    })
    .then((data) => {
      console.log("空氣品質指標");
      console.log(data);

      let tempAQI = [
        "空氣品質指標AQI",
        data["scounty"] + "-" + data["sname"],
        data["published_time"],
        data["aqi"],
        data["status"],
      ];
      setAQIRowData(tempAQI);
    });
};

let fetchUV = (lat, lng, setUVRowData) => {
  fetch(baseUrl + "uv", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }
      return res.json();
    })
    .then((data) => {
      console.log("紫外線指數");
      console.log(data);

      let status = "";
      let uvi = data[data.length - 1]["uvi"];
      if (uvi <= 2) {
        status = "低量級";
      } else if ((uvi >= 3) & (uvi <= 5)) {
        status = "中量級";
      } else if ((uvi >= 6) & (uvi <= 7)) {
        status = "高量級";
      } else if ((uvi >= 8) & (uvi <= 10)) {
        status = "過量級";
      } else {
        status = "危量級";
      }
      let tempUV = [
        "紫外線指數",
        data[data.length - 1]["county"] +
          "-" +
          data[data.length - 1]["site_name"],
        data[data.length - 1]["utime"],
        uvi,
        status,
      ];
      setUVRowData(tempUV);
    });
};

let fetchWQI = (lat, lng, setWQIRowData) => {
  fetch(baseUrl + "water-quality", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }
      return res.json();
    })
    .then((data) => {
      console.log("水庫水質");
      console.log(data);

      if (data.length !== 0) {
        let tempWQI = [
          "水庫水質卡爾森指數",
          "翡翠水庫",
          data[data.length - 1]["date"],
          data[data.length - 1]["ctsi"],
          data[data.length - 1]["status"],
        ];
        setWQIRowData(tempWQI);
      }
    });
};

export { fetchAQI, fetchUV, fetchWQI };
