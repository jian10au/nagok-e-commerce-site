import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction";
import { Link } from "react-router-dom";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
  FormControl,
  NativeSelect,
  FormHelperText,
} from "@material-ui/core";
import CheckOutSteps from "../Layout/CheckOutSteps";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

function OrderNewPage(props) {
  // qty is from the query string;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const { saveOrder } = order;
  const { cartItems, shipping, payment } = cart;

  console.log(cartItems, "cartItems");
  const itemsPrice = cartItems.items.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxAmount = 0.1 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxAmount;
  //   console.log(!shipping, "shipping from placeorder");

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems.items,
        shipping,
        payment: { paymentMethod: payment },
        itemsPrice,
        shippingPrice,
        taxAmount,
        totalPrice,
      })
    );
  };

  if (shipping == {}) {
    props.history.push("/shipping");
    console.log("why it does not run?");
  } else if (payment == {}) {
    props.history.push("/payment");
    console.log("why payment push also runs?");
  }

  useEffect(() => {
    if (saveOrder.order._id) {
      props.history.push(`/orders/${saveOrder.order._id}`);
    }
    // every time if the saveOrder slice update, we check whether the saveOrder.order._id exists,
    // if the saveOrder.order._id exists, this means, the new order is created, and in this case,
    // redirect me to the order screen
  }, [saveOrder]);

  // seems to me above fn only runs for once when the first time the app is rendered; later even when the redux state change;
  // the app does not reload;
  console.log("run every time");
  return (
    <div>
      <div>
        <CheckOutSteps />
      </div>
      <Paper
        variant="outlined"
        style={{
          width: "60%",
          // backgroundColor: "green",
          display: "inline-block",
        }}
      >
        <div>
          Shipping Details:
          <Typography>{shipping.address}</Typography>
          <Typography>{shipping.city}</Typography>
          <Typography>{shipping.postCode}</Typography>
          <Typography>{shipping.country}</Typography>
        </div>
        <div>
          Payment:
          <Typography>{payment}</Typography>
        </div>
      </Paper>

      <Paper>
        <List>
          {cartItems.items.map((item) => (
            <ListItem key={item.product}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                {<Link to={`/products/${item.productId}`}>{item.name}</Link>}
              </ListItemText>

              <ListItemText>Price: {item.price}</ListItemText>
              <ListItemText>Qty: {item.qty}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper
        variant="outlined"
        style={{
          width: "60%",
          // backgroundColor: "green",
          display: "inline-block",
        }}
      >
        <Button variant="contained" color="primary" onClick={placeOrderHandler}>
          Create Order
        </Button>
        <Typography>Order Summary</Typography>
        <Typography>Items Price: {itemsPrice}</Typography>
        <Typography>Shipping: {shippingPrice}</Typography>
        <Typography>GST {taxAmount}</Typography>
        <Typography>Order Total {totalPrice}</Typography>
      </Paper>
    </div>
  );
}

export default OrderNewPage;
