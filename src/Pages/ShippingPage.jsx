import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { saveShipping } from "../actions/cartAction";
import CheckOutSteps from "../Layout/CheckOutSteps";

const ShippingPage = (props) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push("/payment");
  };

  return (
    <div>
      <div>
        <CheckOutSteps step1 step2 />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          width: "60%",
          margin: "10% auto auto",
          border: "1px solid blue",
        }}
      >
        shipping page
        <br />
        <TextField
          id="address"
          variant="filled"
          label="address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <br />
        <TextField
          id="city"
          variant="filled"
          label="city"
          onChange={(event) => setCity(event.target.value)}
        />
        <br />
        <TextField
          id="postalCode"
          variant="filled"
          label="postalCode"
          onChange={(event) => setPostalCode(event.target.value)}
        />
        <br />
        <TextField
          id="country"
          variant="filled"
          label="country"
          onChange={(event) => setCountry(event.target.value)}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          NEXT
        </Button>
      </form>
    </div>
  );
};

export default ShippingPage;
