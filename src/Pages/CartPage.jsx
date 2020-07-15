import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
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
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

function CartPage(props) {
  const productId = props.match.params.id;
  //   product param is from the params
  const orderQty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  console.log(orderQty, "qty from url");
  // qty is from the query string;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    console.log(productId);
    if (productId) {
      dispatch(addToCart(productId, orderQty));
    }
  }, []);

  const handleDeleteItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // seems to me above fn only runs for once when the first time the app is rendered; later even when the redux state change;
  // the app does not reload;
  console.log(orderQty);
  return (
    <div>
      <Paper
        variant="outlined"
        style={{
          width: "60%",
          // backgroundColor: "green",
          display: "inline-block",
        }}
      >
        {cartItems.length > 0 ? (
          <List>
            {cartItems.map((item) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  {<Link to={`/products/${item.productId}`}>{item.name}</Link>}
                </ListItemText>
                <FormControl>
                  <Typography>Qty: </Typography>
                  <NativeSelect
                    // className={classes.selectEmpty}
                    value={item.qty}
                    name="orderQty"
                    onChange={(event) => {
                      console.log("what happens");
                      console.log(event.target.value);
                      dispatch(addToCart(item.productId, event.target.value));
                    }}
                    inputProps={{ "aria-label": "qty" }}
                  >
                    {[...new Array(item.countInStock).keys()].map((elem) => {
                      return (
                        <option key={elem + 1} value={elem + 1}>
                          {elem + 1}
                        </option>
                      );
                    })}
                  </NativeSelect>
                  <FormHelperText variant="standard">
                    Maximum order quantity is subject to available stock
                  </FormHelperText>
                </FormControl>
                <ListItemSecondaryAction>
                  {item.productId}
                  <IconButton
                    onClick={() => {
                      handleDeleteItem(item.productId);
                    }}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemText>Price: {item.price}</ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Empty Cart</Typography>
        )}
      </Paper>
      <Paper style={{ display: "inline-block" }}>
        <Typography>
          Sub Total:{" "}
          {cartItems
            ? cartItems.reduce(
                (cul, currentItem) => cul + currentItem.price * currentItem.qty,
                0
              )
            : null}
        </Typography>

        <Button component={Link} to={`/signin?redirect=shipping`}>
          Proceed to Checkout
        </Button>
      </Paper>
    </div>
  );
}

export default CartPage;
