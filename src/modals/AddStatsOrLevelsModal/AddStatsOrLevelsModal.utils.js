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
    display: 'flex',
    justifyContent: 'space-between'
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


export const numbers = [
  {
    id: '0',
    value: '0'
  },
  {
    id: '1',
    value: '1'
  },
  {
    id: '2',
    value: '2'
  },
  {
    id: '3',
    value: '3'
  },
  {
    id: '4',
    value: '4'
  },
  {
    id: '5',
    value: '5'
  },
]