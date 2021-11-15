let fetchDisposal = (
  lat,
  lng,
  distance,
  setDisposalRowData,
  setDisposalLoc
) => {
  fetch("http://localhost:8000/api/environment/waste-disposal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      distance: distance,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let len = data.length;
      console.log(len);

      setDisposalRowData(len);
      let tempLoc = [];
      for (let i = 0; i < data.length; i++) {
        tempLoc.push([data[i]["latitude"], data[i]["longitude"]]);
      }
      setDisposalLoc(tempLoc);
    });
};

export { fetchDisposal };
