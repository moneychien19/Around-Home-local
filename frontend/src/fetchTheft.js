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
        throw Error("could not fetch theft data");
      }
      return res.json();
    })
    .then((data) => {
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

export default fetchTheft;
