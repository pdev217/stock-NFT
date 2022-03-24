export const fakeCategories = [
  {
    title: "Music Artists",
    src: "/!!!!fakeImage.png",
    id: "1",
  },
  {
    title: "Athletes",
    src: "/!!!!fakeImage.png",
    id: "2",
  },
  {
    title: "Art & Theater",
    src: "/!!!!fakeImage.png",
    id: "3",
  },
  {
    title: "3D Art",
    src: "/!!!!fakeImage.png",
    id: "4",
  },
  {
    title: "VIP",
    src: "/!!!!fakeImage.png",
    id: "5",
  },
  {
    title: "Asset-Backed",
    src: "/!!!!fakeImage.png",
    id: "6",
  },
];

export const fakeChartData = new Array(15).fill({}, 0).map(() => {
  return { name: "Page A", price: Math.random() * 100 };
});
