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

export const mutateTimeRange = (timeRange) => ({
  type: "MUTATE_TIMERANGE",
  payload: {
    timeRange: timeRange,
  },
});

export const mutateDistanceRange = (distanceRange) => ({
  type: "MUTATE_DISTANCERANGE",
  payload: {
    distanceRange: distanceRange,
  },
});

export const mutateShowContent = (showContent) => ({
  type: "MUTATE_SHOW",
  payload: {
    showContent: showContent,
  },
});
