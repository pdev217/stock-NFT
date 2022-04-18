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
}