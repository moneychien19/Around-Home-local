let fetchTheft = (lat, lng, distance, month, setTheftRowData, setTheftLoc) => {
  fetch("http://localhost:8000/api/safety/theft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      distance: Number(distance),
      month: Number(month),
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }
      return res.json();
    })
    .then((data) => {
      console.log("案件");
      console.log(data);

      let tempTheft = {
        自行車竊盜: 0,
        機車竊盜: 0,
        汽車竊盜: 0,
        住宅竊盜: 0,
        強盜: 0,
        搶奪: 0,
      };
      let tempLoc = [];
      for (let i = 0; i < data.length; i++) {
        tempTheft[data[i]["theft_type"]] += 1;
        tempLoc.push([data[i]["latitude"], data[i]["longitude"]]);
      }
      setTheftRowData(tempTheft);
      setTheftLoc(tempLoc);
    });
};

let fetchAccident = (
  lat,
  lng,
  distance,
  month,
  setAccidentRowData,
  setAccidentLoc
) => {
  fetch("http://localhost:8000/api/safety/accident", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      distance: Number(distance),
      month: Number(month),
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }
      return res.json();
    })
    .then((data) => {
      console.log("交通事故");
      console.log(data);

      let tempAccident = { 交通事故: data.length };
      let tempLoc = [];
      setAccidentRowData(tempAccident);
      for (let i = 0; i < data.length; i++) {
        tempLoc.push([data[i]["latitude"], data[i]["longitude"]]);
      }
      setAccidentLoc(tempLoc);
    });
};

export { fetchTheft, fetchAccident };
