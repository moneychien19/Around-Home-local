let fetchAccident = (lat, lng, setAccidentRowData, setAccidentLoc) => {
  fetch("http://localhost:8000/api/safety%20accident", {
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
        throw Error("could not fetch accident data");
      }
      return res.json();
    })
    .then((data) => {
      let tempAccident = { 交通事故: data.length };
      let tempLoc = [];
      setAccidentRowData(tempAccident);
      for (let i = 0; i < data.length; i++) {
        tempLoc.push([data[i]["latitude"], data[i]["longitude"]]);
      }
      setAccidentLoc(tempLoc);
    });
};

export default fetchAccident;