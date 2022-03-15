import Button from "@mui/material/Button";

export const CustButton = ({ text, onClick, color }) => {
  switch (color) {
    case "primary":
      return (
        <Button
          sx={{
            height: "50px",
            textTransform: "none",
            backgroundColor: "#6478fb",
            color: "#fff",
            boxShadow: "none",
            borderRadius: "25px",
            fontSize: "17px",
            paddingRight: "40px",
            paddingLeft: "40px",
            ":hover": {
              backgroundColor: "rgb(82, 96, 227)",
            },
          }}
          onClick={onClick}
          variant="contained"
        >
          {text}
        </Button>
      );
    case "red":
      return (
        <Button
          sx={{
            height: "50px",
            textTransform: "none",
            backgroundColor: "rgb(222, 7, 43)",
            color: "#fff",
            boxShadow: "none",
            borderRadius: "25px",
            fontSize: "17px",
            paddingRight: "40px",
            paddingLeft: "40px",
            ":hover": {
              backgroundColor: "rgb(202, 10, 23)",
            },
          }}
          onClick={onClick}
          variant="contained"
        >
          {text}
        </Button>
      );
  }
};
