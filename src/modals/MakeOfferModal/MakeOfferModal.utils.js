export const styles = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 720,
    bgcolor: "#212020",
    borderRadius: "24px",
    boxShadow: 24,
    marginBottom: "20px",
    color: "white",
    ":focus-visible": {
      outline: "none",
    },
  },
  header: {
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    fontSize: "22px",
    letterSpacing: "0px",
    color: "var(--white)",
    borderBottom: "1px solid var(--dark-grey)",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
  },
  description: {
    fontWeight: "normal",
    fontFamily: "Poppins, sans-serif",
    fontSize: "18px",
    letterSpacing: "0.02px",
    color: "var(--light-grey)",
    padding: "24px",
  },
};

export const daysSelectArray = ["1 day"]
  .concat(new Array(30).fill(0, 0).map((elem, i) => (elem = `${i + 2} days`)))
  .concat(["None"]);

export const getExpirationDate = (days, time) => {
  let inDays;
  let hours;
  let minutes;

  if (days === "None") {
    inDays = 0;
  } else {
    inDays = Number(days.substring(0, days.indexOf(" ")));
  }

  if (time === "") {
    hours = 0;
    minutes = 0;
  } else {
    hours = Number(time.substring(0, 2));
    minutes = Number(time.substring(3));
  }

  let expirationDate = new Date()
  expirationDate = Date.parse(expirationDate);

  expirationDate += inDays * 1000 * 60 * 60 * 24;

  expirationDate = new Date(expirationDate);

  time !== '' && expirationDate.setHours(hours);
  time !== '' && expirationDate.setMinutes(minutes)

  return expirationDate.toISOString();
};
