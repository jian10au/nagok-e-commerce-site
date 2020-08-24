import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import { Button } from "@material-ui/core";
import axios from "axios";

import { BASE_URL } from "../config";

function PaypalButton(props) {
  const [sdkReady, setsdkReady] = useState(false);

  const addPaypalSdk = async () => {
    const result = await axios.get(`${BASE_URL}/api/config/paypal`);
    const clientID = result.data;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.paypal.com/sdk/js?client-id=" + clientID;
    script.async = true;
    script.onload = () => {
      setsdkReady(true);
    };

    document.body.appendChild(script);
  };

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: props.amount,
          },
        },
      ],
    });

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => props.onSuccess(data, details))
      .catch((err) => console.log(err));

  useEffect(() => {
    // let isUnmount = false;

    if (!window.paypal) {
      // if the paypal script does not exist;
      // load the paypal script
      addPaypalSdk();
    }

    return () => {
      // isUnmount = true;
    };
  }, []);

  if (!sdkReady) {
    console.log("sdk is not ready");
    return <div>Loading...</div>;
  }

  const Button = window.paypal.Buttons.driver("react", { React, ReactDOM });

  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );

  // again the setup in here is just for paypal itself;
}

export default PaypalButton;
