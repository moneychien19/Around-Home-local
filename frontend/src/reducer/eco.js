const initState = {
  greenRes: [],
  greenStore: [],
  rewardRes: [],
  garbage: [],
  clothes: [],
  disposal: [],
};

export const ecoReducer = (state = initState, action) => {
  switch (action.type) {
    case "MUTATE_GREEN_RES":
      return {
        ...state,
        greenRes: action.payload.greenRes,
      };
    case "MUTATE_GREEN_STORE":
      return {
        ...state,
        greenStore: action.payload.greenStore,
      };
    case "MUTATE_REWARD_RES":
      return {
        ...state,
        rewardRes: action.payload.rewardRes,
      };
    case "MUTATE_GARBAGE":
      return {
        ...state,
        garbage: action.payload.garbage,
      };
    case "MUTATE_CLOTHES":
      return {
        ...state,
        clothes: action.payload.clothes,
      };
    case "MUTATE_DISPOSAL":
      return {
        ...state,
        disposal: action.payload.disposal,
      };
    default:
      return state;
  }
};
