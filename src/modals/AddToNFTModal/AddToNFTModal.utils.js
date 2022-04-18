import { v4 } from "uuid";

export const getEmptyLevelOrStat = () => {
  return { name: "", nftValue: 3, maxValue: 5, id: v4() };
};

export const getEmptyProperty = () => {
  return { type: "", name: "", id: v4() };
};
