import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createOrder,
  detailsOrder,
  payOrder,
  deliverOrder,
} from "../actions/orderAction";
import PaypalButton from "../Layout/PaypalButton";

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

function OrderDetailsPage(props) {
  const orderDetails = useSelector((state) => state.order.activeOrder);
  const saveOrder = useSelector((state) => state.order.saveOrder);
  const user = useSelector((state) => state.user.userInfo);

  const {
    loading: loadingOrderDetails,
    order,
    error: errorLoadingOrderDetails,
  } = orderDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    // if (successPay) {
    //   props.history.push("/profile");
    // } else {
    dispatch(detailsOrder(props.match.params.id));
    // }
    return () => {};
  }, [saveOrder]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const handleDeliverOrder = (event, orderId) => {
    event.preventDefault();
    dispatch(deliverOrder(orderId));
  };

  return loadingOrderDetails ? (
    <div>Loading ...</div>
  ) : errorLoadingOrderDetails ? (
    <div>{errorLoadingOrderDetails}</div>
  ) : order._id ? (
    <div>
      <div className="placeorder">
        <Paper>
          <div className="placeorder-info">
            <div>
              <h3>Shipping</h3>
              <div>
                {order.shipping.address}, {order.shipping.city},
                {order.shipping.postalCode}, {order.shipping.country},
              </div>
              <div>
                {order.isDelivered
                  ? "Delivered at " + order.deliveredAt
                  : "Not Delivered."}
              </div>
            </div>
            <div>
              <h3>Payment</h3>
              <div>Payment Method: {order.payment.paymentMethod}</div>
              <div>
                {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
              </div>
            </div>
            <div>
              <ul className="cart-list-container">
                <li>
                  <h3>Shopping Cart</h3>
                  <div>Price</div>
                </li>
                {order.orderItems.length === 0 ? (
                  <div>Cart is empty</div>
                ) : (
                  order.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                        </div>
                        <div>Qty: {item.qty}</div>
                      </div>
                      <div className="cart-price">${item.price}</div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </Paper>

        <Paper>
          <div className="placeorder-action">
            <ul>
              <li className="placeorder-actions-payment">
                {/* {loadingPay && <div>Finishing Payment...</div>} */}
                {!order.isPaid && (
                  <PaypalButton
                    amount={order.totalPrice}
                    onSuccess={handleSuccessPayment}
                  />
                )}
              </li>
              <li>
                <h3>Order Summary</h3>
              </li>
              <li>
                <div>Items</div>
                <div>${order.itemsPrice}</div>
              </li>
              <li>
                <div>Shipping</div>
                <div>${order.shippingPrice}</div>
              </li>
              <li>
                <div>Tax</div>
                <div>${order.taxPrice}</div>
              </li>
              <li>
                <div>Order Total</div>
                <div>${order.totalPrice}</div>
              </li>
            </ul>
          </div>
        </Paper>
        {user.isAdmin && order.isPaid ? (
          <Button onClick={(event) => handleDeliverOrder(event, order._id)}>
            Deliver Order
          </Button>
        ) : null}
      </div>
    </div>
  ) : null;
}

export default OrderDetailsPage;
