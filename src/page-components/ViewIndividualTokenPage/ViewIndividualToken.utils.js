export const images = ["svg", "jpg", "png", "gif"];
export const videos = ["mp4", "webm"];
export const audios = ["mp3", "wav"];

export const fakePrice = {
  eth: 0.211,
  usd: 667.75,
};

export const fakeListing = [
  {
    price: {
      eth: 1.0577,
      usd: 667.75,
    },
    expiration: new Date(2022, 6, 1, 2, 3, 4, 567),
    owner: "CreVthor",
    id: "1",
  },
  {
    price: {
      eth: 1.0677,
      usd: 687.75,
    },
    expiration: new Date(2022, 3, 15, 1, 3, 4, 567),
    owner: "Darth Vader",
    id: "2",
  },
];

export const fakeOffers = [
  {
    price: {
      eth: 1.0577,
      usd: 667.75,
    },
    expiration: new Date(2022, 6, 1, 2, 3, 4, 567),
    owner: "CreVthor",
    id: "1",
  },
  {
    price: {
      eth: 1.0677,
      usd: 687.75,
    },
    expiration: new Date(2022, 3, 14, 1, 3, 4, 567),
    owner: "Darth Vader",
    id: "2",
  },
];
export const fakeActivity = [
  {
    event: "Offers",
    price: {
      eth: 6.95,
      usd: 19494.06,
    },
    from: "Birds_of_Pray",
    to: "Son fo Anarchy Chris",
    date: new Date(2022, 1, 1, 2, 3, 4, 567),
    id: "1",
  },
  {
    event: "Offers",
    price: {
      eth: 6.95,
      usd: 19494.06,
    },
    from: "Birds_of_Pray",
    to: "Son fo Anarchy Chris",
    date: new Date(2022, 0, 1, 2, 3, 4, 567),
    id: "2",
  },
];

export const fakeLikes = 15;