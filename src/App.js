import React from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import theme from "./Layout/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Route, Switch } from "react-router-dom";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import SignInPage from "./Pages/SignInPage";
import RegisterPage from "./Pages/RegisterPage";
import ProductPage from "./Pages/ProductPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import OrderScreen from "./Pages/OrderScreen";
import UserProfilePage from "./Pages/UserProfilePage";
import OrderManagePage from "./Pages/OrderManagePage";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/products" component={ProductPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cart/:id" component={CartPage} />
          <Route exact path="/products/:id" component={ProductDetailsPage} />
          <Route exact path="/shipping" component={ShippingPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/placeorder" component={PlaceOrderPage} />
          <Route exact path="/orders/:id" component={OrderScreen} />
          <Route exact path="/profile" component={UserProfilePage} />
          <Route exact path="/manage" component={OrderManagePage} />
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
