import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInfo } from "./actions/userAction";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import theme from "./Layout/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory, Route, Switch } from "react-router-dom";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import SignInPage from "./Pages/SignInPage";
import RegisterPage from "./Pages/RegisterPage";
import ProductPage from "./Pages/ProductPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import OrderNewPage from "./Pages/OrderNewPage";
import OrderDetailsPage from "./Pages/OrderDetails";
import UserProfilePage from "./Pages/UserProfilePage";
import OrderIndexPage from "./Pages/OrderIndexPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserInfo());
  }, []);

  console.log("app rendered");
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/category/:id" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/products" component={ProductPage} />
          <Route path="/cart/:id" component={CartPage} />
          <Route path="/cart" component={CartPage} />
          <Route exact path="/products/:id" component={ProductDetailsPage} />
          <Route exact path="/shipping" component={ShippingPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/orders/new" component={OrderNewPage} />
          <Route exact path="/orders/:id" component={OrderDetailsPage} />
          <Route exact path="/profile" component={UserProfilePage} />
          <Route exact path="/orders" component={OrderIndexPage} />
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
