export const getDate = (date) => {
  const nowDate = new Date();
  const prevDate = new Date(date);

  const difference = nowDate - prevDate;

  const minutes = Math.floor(difference / 1000 / 60);

  if (minutes < 60) {
    if (minutes === 1) return `${minutes} minute ago`;
    else return `${minutes} minutes ago`;
  }

  const hours = Math.floor(difference / 1000 / 60 / 60);

  if (hours < 24) {
    if (hours === 1) return `${hours} hour ago`;
    else return `${hours} hours ago`;
  }

  const days = Math.floor(difference / 1000 / 60 / 60 / 24);

  if (days < 30) {
    if (days === 1) return `${days} day ago`;
    else return `${days} days ago`;
  }

  const months = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);

  if (months === 1) return `${months} month ago`;
  else return `${months} months ago`;
};

export const filterOptions = [{ id: "1", text: "" }];
