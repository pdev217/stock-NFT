import Button from "@mui/material/Button";

export const CustButton = ({ text, onClick, color, className }) => {
  switch (color) {
    case "primary":
      return (
        <div className={className}>
          <Button
            sx={{
              height: "49px",
              textTransform: "none",
              background: "#617BFF 0% 0% no-repeat padding-box;",
              color: "#fff",
              boxShadow: "none",
              borderRadius: "30px",
              fontSize: "16px",
              lineHeight: "33px",
              letterSpacing: "0.8px",
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
        </div>
      );
    case "red":
      return (
        <div className={className}>
          <Button
            sx={{
              height: "49px",
              textTransform: "none",
              background: "#DD0D2D 0% 0% no-repeat padding-box",
              color: "#fff",
              boxShadow: "none",
              borderRadius: "30px",
              fontSize: "16px",
              lineHeight: "33px",
              letterSpacing: "0.8px",
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
        </div>
      );
  }
};
