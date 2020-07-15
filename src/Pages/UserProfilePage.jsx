import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, update } from "../actions/userAction";
import { listMyOrders } from "../actions/orderAction";
import { productDeleteReducer } from "../reducers/productReducer";
import { Link } from "react-router-dom";

import {
  TextField,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
} from "@material-ui/core";

// when the pages loads, it first extract existing sigin user info from redux;

function UserProfilePage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error } = userUpdate;

  // const myOrderList = useSelector((state) => state.myOrderList);
  // const { loading: loadingOrders, orders, error: errorOrder } = myOrderlist;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update(userInfo._id, name, email, password));
    dispatch(update(userInfo._id, name, email, password));
  };

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
    // setPassWord(userInfo.password);
    // notice, i let all the logic to run
    //after the logic of fetching the user from frontend finishes; do something else;

    // here is the thing it seems to me the listMyOrder is dependant on the
    dispatch(listMyOrders());
  }, []);

  console.log("rendered");

  return (
    <div>
      {/* loading and update in here is about uploading and error */}
      {loading && <div> Updating</div>}
      {error && <div> Error</div>}

      <Paper>
        <Typography variant="h3">User Profile</Typography>
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

          <Button type="submit" variant="outlined" color="primary">
            Update your details
          </Button>

          <Button variant="contained" onClick={handleLogout}>
            Log Out
          </Button>
        </form>
      </Paper>

      <Paper>
        {loadingOrders ? (
          <div>Loading Orders</div>
        ) : errorOrders ? (
          <div>{errorOrders.message}</div>
        ) : (
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Is Paid?</TableCell>
                    <TableCell>Is Delivered?</TableCell>
                    <TableCell>Delivery date</TableCell>

                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {order._id}
                      </TableCell>
                      <TableCell align="right">{order.totalPrice}</TableCell>
                      <TableCell align="right">
                        {order.isPaid ? "YES" : "NO"}
                      </TableCell>
                      <TableCell align="right">
                        {order.isDelivered ? "YES" : "NO"}
                      </TableCell>
                      <TableCell align="right">
                        {order.deliveredAt ? `${order.deliveredAt}` : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/orders/${order._id}`}>Order Detail</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default UserProfilePage;
