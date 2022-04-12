export const mutateGreenRes = (greenRes) => ({
  type: "MUTATE_GREEN_RES",
  payload: {
    greenRes: greenRes,
  },
});

export const mutateGreenStore = (greenStore) => ({
  type: "MUTATE_GREEN_STORE",
  payload: {
    greenStore: greenStore,
  },
});

export const mutateRewardRes = (rewardRes) => ({
  type: "MUTATE_REWARD_RES",
  payload: {
    rewardRes: rewardRes,
  },
});

export const mutateGarbage = (garbage) => ({
  type: "MUTATE_GARBAGE",
  payload: {
    garbage: garbage,
  },
});

export const mutateClothes = (clothes) => ({
  type: "MUTATE_CLOTHES",
  payload: {
    clothes: clothes,
  },
});

export const mutateDisposal = (disposal) => ({
  type: "MUTATE_DISPOSAL",
  payload: {
    disposal: disposal,
  },
});
