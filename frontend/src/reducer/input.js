const initState = {
  address: "國立台灣大學",
  showContent: [false, false, false],
  lat: 25.014947,
  lng: 121.535549,
  timeRange: "6",
  distanceRange: "1000",
  showContent: [false, false, false],
};

export const inputReducer = (state = initState, action) => {
  switch (action.type) {
    case "MUTATE_ADDRESS":
      return {
        ...state,
        address: action.payload.address,
      };
    case "MUTATE_LAT":
      return {
        ...state,
        lat: action.payload.lat,
      };
    case "MUTATE_LNG":
      return {
        ...state,
        lng: action.payload.lng,
      };
    case "MUTATE_TIMERANGE":
      return {
        ...state,
        timeRange: action.payload.timeRange,
      };
    case "MUTATE_DISTANCERANGE":
      return {
        ...state,
        distanceRange: action.payload.distanceRange,
      };
    case "MUTATE_SHOW":
      return {
        ...state,
        showContent: action.payload.showContent,
      };
    default:
      return state;
  }
};
