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
  
    if (days < 30) {
      if (days === 1) return `about ${days} day`;
      else return `about ${days} days`;
    }
  
    const months = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);
  
    if (months === 1) return `about ${months} month`;
    else return `about ${months} months`;
  };