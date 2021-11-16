let fetchAQI = (lat, lng, setAQIRowData) => {
  fetch("http://localhost:8000/api/environment/air-quality", {
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
        data["aqi"],
        data["status"],
        data["published_time"],
      ];
      setAQIRowData(tempAQI);
    });
};

let fetchUV = (lat, lng, setUVRowData) => {
  fetch("http://localhost:8000/api/environment/uv", {
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
        uvi,
        status,
        data[data.length - 1]["utime"],
      ];
      setUVRowData(tempUV);
    });
};

let fetchWQI = (lat, lng, setWQIRowData) => {
  fetch("http://localhost:8000/api/environment/water-quality", {
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

      let tempWQI = [
        "水庫水質卡爾森指數",
        "翡翠水庫",
        data[data.length - 1]["ctsi"],
        data[data.length - 1]["status"],
        data[data.length - 1]["date"],
      ];
      setWQIRowData(tempWQI);
    });
};

export { fetchAQI, fetchUV, fetchWQI };
