import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { register } from "../actions/userAction";

const RegisterPage = (props) => {
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : // basically, it says if the previous links have a query string then points
      // to shipping;
      // it basically says we are from the cart screen and redirect to sigin from the
      // cart proceed to checkout
      "/";
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [name, setName] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  // basically pull out the details from the objects managed by each reducer
  // get the reducer data from redux;

  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    console.log("what happens");
    event.preventDefault();
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    console.log(userInfo, "did user infor from register change?");
    if (userInfo) {
      console.log(userInfo, "run into here?");
      props.history.push(redirect);
    }
  }, [userInfo]);
  console.log(userInfo);
  return (
    <div>
      Shipping Page
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
          id="name"
          value={name}
          variant="filled"
          onChange={(event) => setName(event.target.value)}
          label="name"
        />

        <br />
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

        <Typography color="secondary">
          <Link
            to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
          >
            Back to Sign In
          </Link>
        </Typography>
        <Button type="submit" variant="outlined" color="primary">
          create an account
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
