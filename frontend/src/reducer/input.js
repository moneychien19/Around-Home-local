const initState = {
  address: "國立台灣大學",
  showContent: [false, false, false],
  lat: 25.014947,
  lng: 121.535549,
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
    default:
      return state;
  }
};
