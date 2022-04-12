const initState = {
  theftCount: {
    自行車竊盜: 0,
    機車竊盜: 0,
    汽車竊盜: 0,
    住宅竊盜: 0,
    強盜: 0,
    搶奪: 0,
  },
  accidentCount: { 交通事故: 0 },
  theftLoc: [],
  accidentLoc: [],
};

export const safetyReducer = (state = initState, action) => {
  switch (action.type) {
    case "MUTATE_THEFT_COUNT":
      return {
        ...state,
        theftCount: action.payload.theftCount,
      };
    case "MUTATE_THEFT_LOC":
      return {
        ...state,
        theftLoc: action.payload.theftLoc,
      };
    case "MUTATE_ACCIDENT_COUNT":
      return {
        ...state,
        accidentCount: action.payload.accidentCount,
      };
    case "MUTATE_ACCIDENT_LOC":
      return {
        ...state,
        accidentLoc: action.payload.accidentLoc,
      };
    default:
      return state;
  }
};
