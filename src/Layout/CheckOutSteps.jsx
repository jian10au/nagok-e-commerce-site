import React from "react";
import { TextareaAutosize } from "@material-ui/core";

function CheckOutSteps(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      className="checkout-steps"
    >
      <div className={props.step1 ? "active" : ""}>Sign In</div>
      <div className={props.step2 ? "active" : ""}>Shipping</div>
      <div className={props.step3 ? "active" : ""}>Payment</div>
      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
}

export default CheckOutSteps;
