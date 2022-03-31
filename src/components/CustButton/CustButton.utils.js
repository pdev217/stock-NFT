import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    button: {
        "&.Mui-button-root .Mui-disabled" : {
            backgroundColor: "var(--dark-grey) 0% 0% no-repeat padding-box",
              color: "var(--light-grey)",
        }
    }
  }));