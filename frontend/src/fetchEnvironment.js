let fetchAQI = (lat, lng, setAQIRowData) => {
  fetch("http://localhost:8000/api/environment/airquality", {
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
      let tempAQI = [
        "空氣品質指標AQI",
        data["scounty"] + "-" + data["sname"],
        data["aqi"],
        data["status"],
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
      let status = "";
      if (data["uvi"] <= 2) {
        status = "低量級";
      } else if ((data["uvi"] >= 3) & (data["uvi"] <= 5)) {
        status = "中量級";
      } else if ((data["uvi"] >= 6) & (data["uvi"] <= 7)) {
        status = "高量級";
      } else if ((data["uvi"] >= 8) & (data["uvi"] <= 10)) {
        status = "過量級";
      } else {
        status = "危量級";
      }
      let tempUV = [
        "紫外線指數",
        data["county"] + "-" + data["site_name"],
        data["uvi"],
        status,
      ];
      setUVRowData(tempUV);
    });
};

export { fetchAQI, fetchUV };
