import React from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import theme from "./Layout/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Route, Switch } from "react-router-dom";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products/:id" component={ProductDetailsPage} />
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
