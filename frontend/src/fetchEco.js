const baseUrl = "http://localhost:8000/api/eco/";

let fetchGreen = (
  lat,
  lng,
  distance,
  setGreenResLoc,
  setGreenResRowData,
  setGreenStoreLoc,
  setGreenStoreRowData
) => {
  fetch(baseUrl + "green-store", {
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
      console.log("綠色商家");
      console.log(data);

      let tempResLoc = [];
      let tempStoreLoc = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]["store_type_id"] === 1) {
          tempResLoc.push([data[i]["latitude"], data[i]["longitude"]]);
        }
        if (data[i]["store_type_id"] === 2) {
          tempStoreLoc.push([data[i]["latitude"], data[i]["longitude"]]);
        }
      }
      setGreenResLoc(tempResLoc);
      setGreenResRowData(tempResLoc.length);
      setGreenStoreLoc(tempStoreLoc);
      setGreenStoreRowData(tempStoreLoc.length);
    });
};

let fetchReward = (
  lat,
  lng,
  distance,
  setRewardResLoc,
  setRewardResRowData
) => {
  fetch(baseUrl + "reward-store", {
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
      console.log("優惠商家");
      console.log(data);

      let tempResLoc = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]["store_type_id"] === 1) {
          tempResLoc.push([data[i]["latitude"], data[i]["longitude"]]);
        }
      }
      setRewardResLoc(tempResLoc);
      setRewardResRowData(tempResLoc.length);
    });
};

let fetchGarbage = (lat, lng, distance, setGarbageRowData, setGarbageLoc) => {
  fetch(baseUrl + "garbage-truck", {
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
      console.log("垃圾車停靠點");
      console.log(data);

      let len = data.length;
      setGarbageRowData(len);

      let tempLoc = [];
      for (let i = 0; i < data.length; i++) {
        tempLoc.push([data[i]["latitude"], data[i]["longitude"]]);
      }
      setGarbageLoc(tempLoc);
    });
};

let fetchClothes = (lat, lng, distance, setClothesRowData, setClothesLoc) => {
  fetch(baseUrl + "clothes-recycle", {
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
      console.log("舊衣回收箱");
      console.log(data);

      let len = data.length;
      setClothesRowData(len);
      let tempLoc = [];
      for (let i = 0; i < data.length; i++) {
        tempLoc.push([data[i]["latitude"], data[i]["longitude"]]);
      }
      setClothesLoc(tempLoc);
    });
};

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
      console.log("廢棄物處理場");
      console.log(data);

      let len = data.length;
      setDisposalRowData(len);
      let tempLoc = [];
      for (let i = 0; i < data.length; i++) {
        tempLoc.push([data[i]["latitude"], data[i]["longitude"]]);
      }
      setDisposalLoc(tempLoc);
    });
};

export { fetchGreen, fetchReward, fetchGarbage, fetchClothes, fetchDisposal };
