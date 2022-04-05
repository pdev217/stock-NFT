import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  {
    textField: {
      borderRadius: "7px",
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
        borderRadius: "7px",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "7px",
        },
        "&:hover fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "7px",
        },
        "&.Mui-focused fieldset": {
          borderColor: "var(--primary)",
          borderRadius: "7px",
        },
      },
    },
    icon: {
      fill: "var(--light-grey)",
    },
    select: {
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "2px solid var(--primary)",
      },
      "&.Mui-focused .MuiOutlinedInput-root": {
        border: "2px solid var(--primary)",
      },
      "&.MuiOutlinedInput-root:hover fieldset": {
        border: "1px solid var(--shadow)",
        borderRadius: "7px",
      },

      "&.MuiOutlinedInput-root fieldset": {
        border: "1px solid var(--shadow)",
        borderRadius: "7px",
      },
      "&.Mui-disabled span": {
        color: "black",
      },
    },
    textFieldLeftHalf: {
      borderRadius: "7px 0 0 7px",
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
        borderRadius: "7px 0 0 7px",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "7px 0 0 7px",
        },
        "&:hover fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "7px 0 0 7px",
        },
        "&.Mui-focused fieldset": {
          borderColor: "var(--primary)",
          borderRadius: "7px 0 0 7px",
        },
      },
    },
    textFieldRightHalf: {
      borderRadius: "0 7px 7px 0",
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
        borderRadius: "0 7px 7px 0",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "0 7px 7px 0",
        },
        "&:hover fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "0 7px 7px 0",
        },
        "&.Mui-focused fieldset": {
          borderColor: "var(--primary)",
          borderRadius: "0 7px 7px 0",
        },
      },
    },
    tripleTextFieldTop: {
      borderRadius: "0 7px 0 0",
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
        borderRadius: "0 7px 0 0",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "0 7px 0 0",
          borderBottom: 'none',
          borderLeft: 'none'
        },
        "&:hover fieldset": {
          border: "1px solid var(--shadow)",
          borderRadius: "0 7px 0 0",
          borderBottom: 'none',

          borderLeft: 'none'
        },
        "&.Mui-focused fieldset": {
          border: "2px solid var(--primary)",
          borderRadius: "0 7px 0 0",
        },
      },
    },
    tripleTextFieldCenter: {
      borderRadius: "0px",
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
        borderRadius: "0px",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "0px",
          borderBottom: 'none',
          borderLeft: 'none'
        },
        "&:hover fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "0px",
          borderBottom: 'none',
          borderLeft: 'none'
        },
        "&.Mui-focused fieldset": {
          border: "2px solid var(--primary)",
          borderRadius: "0px",
        },
      },
    },
    tripleTextFieldBottom: {
      borderRadius: "0 0 7px 7px",
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "yellow",
        borderRadius: "0 0 7px 0",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "0 0 7px 0",
          borderLeft: 'none'
        },
        "&:hover fieldset": {
          borderColor: "var(--shadow)",
          borderRadius: "0 0 7px 0",
          borderLeft: 'none'
        },
        "&.Mui-focused fieldset": {
          border: "2px solid var(--primary)",
          borderRadius: "0 0 7px 0",
        },
      },
    },
  },
  
  { name: "MuiCustomized" }
);
