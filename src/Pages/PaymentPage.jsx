import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { savePayment } from "../actions/cartAction";
import CheckOutSteps from "../Layout/CheckOutSteps";

const PaymentPage = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push("/orders/new");
  };

  return (
    <div>
      <div>
        <CheckOutSteps step1 step2 step3 />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          width: "60%",
          margin: "10% auto auto",
          border: "1px solid blue",
        }}
      >
        Place Order Page
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup aria-label="gender" name="gender1">
            <FormControlLabel
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="paypal"
              control={<Radio color="primary" />}
              label="Payment"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <Button type="submit" variant="contained" color="primary">
          NEXT
        </Button>
      </form>
    </div>
  );
};

export default PaymentPage;
