const baseUrl = "http://localhost:8000/api/eco/";

let fetchGreen = async (lat, lng, distance) => {
  return await fetch(baseUrl + "green-store", {
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
    .catch((err) => {
      return err;
    });
};

let fetchReward = async (lat, lng, distance) => {
  return await fetch(baseUrl + "reward-store", {
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
    .catch((err) => {
      return err;
    });
};

let fetchGarbage = async (lat, lng, distance) => {
  return await fetch(baseUrl + "garbage-truck", {
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
    .catch((err) => {
      return err;
    });
};

let fetchClothes = async (lat, lng, distance) => {
  return await fetch(baseUrl + "clothes-recycle", {
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
    .catch((err) => {
      return err;
    });
};

let fetchDisposal = async (lat, lng, distance) => {
  return await fetch("http://localhost:8000/api/environment/waste-disposal", {
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
    .catch((err) => {
      return err;
    });
};

export { fetchGreen, fetchReward, fetchGarbage, fetchClothes, fetchDisposal };
