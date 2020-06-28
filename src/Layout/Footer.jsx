import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    backgroundColor: theme.palette.common.jbBlack,
    color: "white",
    textAlign: "center",
    position: "fixed",
    bottom: "0",
    zIndex: "100",
  },
}));

function Footer() {
  const classes = useStyles();
  return <div className={classes.footer}>All right reserved</div>;
}

export default Footer;
