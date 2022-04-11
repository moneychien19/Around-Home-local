export const mutateAddress = (address) => ({
  type: "MUTATE_ADDRESS",
  payload: {
    address: address,
  },
});

export const mutateLat = (lat) => ({
  type: "MUTATE_LAT",
  payload: {
    lat: lat,
  },
});

export const mutateLng = (lng) => ({
  type: "MUTATE_LNG",
  payload: {
    lng: lng,
  },
});
