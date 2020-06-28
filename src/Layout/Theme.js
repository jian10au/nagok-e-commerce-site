import { createMuiTheme } from "@material-ui/core/styles";

const jbYellow = "#FFEC0F";
const jbBlack = "#000000";
const jbRed = "#FFFFFF";
const jbGreen = "#018702";

const theme = createMuiTheme({
  palette: {
    common: {
      jbYellow: `${jbYellow}`,
      jbBlack: `${jbBlack}`,
      jbRed: `${jbRed}`,
      jbGreen: `${jbGreen}`,
    },
  },
});

export default theme;
