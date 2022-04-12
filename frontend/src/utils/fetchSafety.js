let fetchTheft = async (lat, lng, distance, month) => {
  return await fetch("http://localhost:8000/api/safety/theft", {
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
    .catch((err) => {
      return err;
    });
};

let fetchAccident = async (lat, lng, distance, month) => {
  return await fetch("http://localhost:8000/api/safety/accident", {
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
    .catch((err) => {
      return err;
    });
};

export { fetchTheft, fetchAccident };
