import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { Link } from "react-router-dom";
import { listAllOrders, deleteOrder } from "../actions/orderAction";
import { deleteProduct } from "../actions/productActions";

function OrderManagePage() {
  // get the state from redux and list them out;

  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const orderDelete = useSelector((state) => state.orderDelete);
  const { loading, orders, error } = orderList;
  const {
    loading: loadingDelete,
    success: deleteSuccess,
    error: deleteError,
  } = orderDelete;

  const handleDelete = (event, orderId) => {
    event.preventDefault();
    dispatch(deleteOrder(orderId));
  };

  useEffect(() => {
    dispatch(listAllOrders());
  }, [deleteSuccess]);

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      {" "}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Order Value</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell component="th" scope="row">
                  {order._id}
                </TableCell>
                <TableCell align="right">{order.isPaid.toString()}</TableCell>
                <TableCell align="right">
                  {order.isDelivered.toString()}
                </TableCell>
                <TableCell align="right">{order.totalPrice}</TableCell>
                <TableCell align="right">
                  <Link to={`orders/${order._id}`}>Details</Link>
                  <Button
                    onClick={(event) => {
                      handleDelete(event, order._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default OrderManagePage;
