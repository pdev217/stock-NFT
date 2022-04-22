import {
  normalSections,
  activitySections,
  onlyCollections,
  forCollectionsOnly,
  forNormal,
} from "../../../Sidebar/Sidebar.utils";

export const getAvailableSections = (choosenTopSection) => {
  const result = [];

  if (forNormal.includes(choosenTopSection)) {
    for (let entry of Object.entries(normalSections)) {
      result.push(entry[1].section);
    }

    return result;
  }

  if (forCollectionsOnly.includes(choosenTopSection)) {
    for (let entry of Object.entries(onlyCollections)) {
      result.push(entry[1].section);
    }

    return result;
  }

  for (let entry of Object.entries(activitySections)) {
    result.push(entry[1].section);
  }

  return result;
};
