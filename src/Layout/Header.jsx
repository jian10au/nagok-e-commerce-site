import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    backgroundColor: theme.palette.common.jbYellow,
    color: "white",
    fontWeight: "400",
    fontSize: "1.6rem",
  },
  brand: {
    "&:hover": { backgroundColor: "transparent" },
    "&:visited": {
      color: "white",
    },
    color: "white",
    fontSize: "2.5rem",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  tabContainer: {
    marginLeft: "auto",
  },

  menuIconBtn: {
    // backgroundColor: theme.palette.common.jbYellow,
    // border: "none",
    // padding: "1 1 1 1",
    // height: "50px",
    // width: "50px",
  },
  tab: {
    boxSizing: "border-box",
    height: "50px",
    fontSize: "2rem",
    color: "black",
    fontWeight: "600",
  },

  drawer: {
    backgroundColor: theme.palette.common.jbYellow,
  },

  drawerIconContainer: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerItem: {
    textAlign: "center",
    boxSizing: "border-box",
    height: "30px",
    // width: "30vw",
    fontSize: "1.6rem",
    color: "black",
  },
}));

function Header() {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const drawer = (
    <>
      <SwipeableDrawer
        // transitionDuration={5000}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onOpen={() => {
          setOpenDrawer(true);
          console.log("opened is triggered?");
        }}
        onClose={() => {
          console.log("close is triggered");
          setOpenDrawer(false);
        }}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <ListItemText
            style={{
              // backgroundColor: "black",
              fontSize: "25px",
              color: "white",
              textAlign: "center",
              padding: "0.5em",
              backgroundColor: "black",
              fontWeight: "700",
              marginTop: "0",
              textTransform: "uppercase",
            }}
            disableTypography
          >
            Shopping Categories
            <IconButton onClick={() => setOpenDrawer(false)} color="secondary">
              <CloseIcon
                style={{
                  color: "white",
                  height: "25px",
                  width: "25px",
                  verticalAlign: "text-top",
                }}
              />
            </IconButton>
          </ListItemText>

          <ListItem
            onClick={() => {
              setOpenDrawer(false);
            }}
            component={Link}
            to="#"
            divider
            button
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Mobile Phones
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
            }}
            component={Link}
            to="#"
            divider
            button
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Laptops
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
            }}
            component={Link}
            to="#"
            divider
            button
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Gaming Consoles
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );

  return (
    <>
      <AppBar className={classes.header}>
        {/* <title style={{ color: "black" }}>Nogak</title>
        why */}
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            className={classes.drawerIconContainer}
            disableRipple
            onClick={() => setOpenDrawer(!openDrawer)}
            // well actually disable the ripple is easy but menuIcon has on hover effect you need to disable as well
          >
            <MenuIcon className={classes.drawerIcon} />
          </IconButton>
          <Button
            disableRipple
            component={Link}
            className={classes.brand}
            to="/"
          >
            Nogak
          </Button>
          <Tabs className={classes.tabContainer}>
            {userInfo.name ? (
              <Tab
                disableRipple
                className={classes.tab}
                label={`${userInfo.name}`}
                component={Link}
                to="/profile"
              />
            ) : (
              <Tab
                disableRipple
                className={classes.tab}
                label="Sign In"
                component={Link}
                to="/signin"
              />
            )}
            {/* why disable the ripple for the tab is so easy but disable the ripple for the menuIcon is so hard? */}
            <Tab
              disableRipple
              to="/cart"
              component={Link}
              className={classes.tab}
              label="Cart"
            />
            {userInfo.isAdmin ? (
              <Tab
                disableRipple
                className={classes.tab}
                to="/products"
                component={Link}
                label="Manage Products"
              />
            ) : null}
            {userInfo.isAdmin ? (
              <Tab
                disableRipple
                className={classes.tab}
                to="/orders"
                component={Link}
                label="Manage Orders"
              />
            ) : null}
          </Tabs>
        </Toolbar>
        {openDrawer ? drawer : null}
      </AppBar>
      <div style={{ height: "8rem" }}></div>
    </>
  );
}

export default Header;
