const monthDayYearOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const hourMinuteOptions = {
  hour: "numeric",
  minute: "numeric",
};

export const getCorrectDateString = (time) => {
  const date = new Date(time);
  const monthDayYear = date.toLocaleString("en-US", monthDayYearOptions);
  const hourMinute = date.toLocaleString("en-US", hourMinuteOptions);
  const withoutPmOrAm = hourMinute.substring(0, hourMinute.length - 3);
  const amOrPm = hourMinute.substring(hourMinute.length - 2).toLowerCase();

  return `${monthDayYear} at ${withoutPmOrAm}${amOrPm}`;
};

export const priceHistorySelectOptions = [
  {
    text: "All Time",
    id: "1",
  },
];

export const fakePriceData = new Array(7).fill({}, 0).map(() => {
  const newDate = new Date();
  const chartDate = `${newDate.getMonth() + 1}/${newDate.getDate()}`;

  return { name: "Page A", price: Math.random(), date: chartDate };
});
