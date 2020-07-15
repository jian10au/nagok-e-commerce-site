import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { signIn } from "../actions/userAction";

const SignInPage = (props) => {
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : // basically, it says if the previous links have a query string then points
      // to shipping;
      // it basically says we are from the cart screen and redirect to sigin from the
      // cart proceed to checkout
      "/";
  // basically with the power of the react routes;
  // this says if the a string starting with ? exists
  // parse the content after the "?" and split the string and return the fist part
  // if the a string start with ? does not exist;
  // return '/'

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  // basically pull out the details from the objects managed by each reducer
  // get the reducer data from redux;

  const { userInfo, loading, error } = userSignIn;
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      // after login; the user is either to '/' or 'the qeury string address'
      props.history.push(redirect);
    }
  }, [userInfo]);

  return (
    <div>
      {loading && <div> Loading ...</div>}
      {error && <div> error.message</div>}
      <form
        onSubmit={(event) => handleSubmit(event)}
        style={{
          width: "60%",
          margin: "10% auto auto",
          border: "1px solid blue",
        }}
      >
        <TextField
          id="email"
          value={email}
          variant="filled"
          onChange={(event) => setEmail(event.target.value)}
          label="email"
        />
        <br />
        <TextField
          id="password"
          value={password}
          variant="filled"
          onChange={(event) => setPassWord(event.target.value)}
          label="password"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          label="submit"
          type="submit"
        >
          Sign In
        </Button>
        <Typography color="secondary">New to Nogak?</Typography>
        <Button
          component={Link}
          //does you come from cart proceed checkout?
          // why because only the from there, you will have a
          // query string
          to={redirect === "/" ? "register" : "/register?redirect=" + redirect}
          variant="outlined"
          color="primary"
        >
          create an account
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
