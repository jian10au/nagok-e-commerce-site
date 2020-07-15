import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// to pull out the redux global state;
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  NativeSelect,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getProductDetails } from "../actions/productActions";

import d1 from "../resources/product_images/d1.jpg";

const useStyles = makeStyles((theme) => ({
  gridArea: {
    padding: "0.5em",
    margin: "0",
    width: "90%",
    margin: "1em auto auto",
  },
  contentContainer: {
    padding: "0.5em",
    width: "80%",
    // height: "90%",
    // backgroundColor: "blue",
    margin: "0 auto auto",
  },
}));

function ProductDetailsPage(props) {
  const productId = props.match.params.id;
  console.log(productId, "product id ?");
  const classes = useStyles();
  const [orderQty, setOrderQty] = useState(1);

  // const product = data.products.find((x) => x._id === props.match.params.id);

  // ;basically achieve the similar thing in react-redux

  const productDetails = useSelector((state) => state.productDetails);
  // basically pull out the details from the objects managed by each reducer
  // get the reducer data from redux;

  const { product, loading, error } = productDetails;
  // pull out the reducer info for later managing the rendering process;

  const loadProductDetailsToGlobalState = useDispatch();
  // get the dispatch from the dispatch hooks and later this will be plugged into the
  //

  const handleChange = (event) => {
    const name = event.target.name;

    setOrderQty(event.target.value);
  };

  const handleAddToCart = () => {
    props.history.push("/cart/" + productId + "?qty=" + orderQty);
  };

  useEffect(() => {
    loadProductDetailsToGlobalState(getProductDetails(productId));

    // you don't need to provide the clean up in here

    return () => {};
  }, []);

  console.log("product Details log how many times?", product);

  return (
    <>
      <Link to="/">Go Back</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.response.data.msg}</div>
      ) : (
        <Grid
          className={classes.gridArea}
          justify={"space-around"}
          // alignItems={"center"}
          container
          spacing={1}
        >
          <Grid xs={12} md={7} item container>
            <Paper
              style={{ boxSizing: "none" }}
              className={classes.contentContainer}
            >
              <img
                style={{
                  width: "50%",
                  height: "80%",
                  margin: "2em auto auto",
                  display: "block",
                }}
                src={d1}
              />
            </Paper>
          </Grid>
          <Grid xs={12} md={3} item container>
            <Paper
              style={{ boxShadow: "none" }}
              className={classes.contentContainer}
            >
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="h6">
                {product.rating} Stars ({product.numReviews})
              </Typography>
              <Typography variant="h6">$ {product.price}</Typography>
              <Typography variant="h6">{product.desciption}</Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={2} item container>
            <Paper
              variant="outlined"
              style={{ backgroundColor: "#FAFAFA" }}
              className={classes.contentContainer}
            >
              <Typography variant="h6">Price: {product.price}</Typography>
              <Typography variant="h6">Status: {product.status}</Typography>

              <Typography>Available Qty: {product.countInStock}</Typography>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  className={classes.selectEmpty}
                  value={orderQty}
                  name="orderQty"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "qty" }}
                >
                  {[...new Array(product.countInStock).keys()].map((elem) => {
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
              {product.countInStock > 0 ? (
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Add To Cart
                </Button>
              ) : (
                <div>Out of Stock</div>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductDetailsPage;
