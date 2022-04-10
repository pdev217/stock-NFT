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

export const getExpirationString = (expTime) => {
  const expDate = new Date(expTime);
  const nowDate = new Date();

  const difference = expDate - nowDate;

  const minutes = Math.floor(difference / 1000 / 60);

  if (minutes < 60) {
    if (minutes === 1) return `${minutes} minute`;
    else return `${minutes} minutes`;
  }

  const hours = Math.floor(difference / 1000 / 60 / 60);

  if (hours < 24) {
    if (hours === 1) return `about ${hours} hour`;
    else return `about ${hours} hours`;
  }

  const days = Math.floor(difference / 1000 / 60 / 60 / 24);

  if (days === 1) return `about ${days} day`;
  else return `about ${days} days`;
};
