const baseUrl = "http://localhost:8000/api/environment/";

const fetchAQI = async (lat, lng) => {
  return await fetch(baseUrl + "air-quality", {
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
    .catch((err) => {
      return err;
    });
};

let fetchUV = async (lat, lng) => {
  return await fetch(baseUrl + "uv", {
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
    .catch((err) => {
      return err;
    });
};

export { fetchAQI, fetchUV };
