import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import axios from "axios";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  productsContainer: {
    // boxSizing: "border-box",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",

    // border: "2px solid green",
  },
  productItem: {
    // backgroundColor: theme.palette.common.jbGreen,
    textAlign: "center",
    // border: "solid black 2px",
    marginRight: "2",
  },
  cardImage: {
    height: "30%",
    paddingTop: "50%",
  },

  productName: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  productBrand: {
    fontSize: "1.2rem",
    color: "#808080",
  },

  productPrice: {
    fontSize: "2rem",
    fontWeight: "bold",
  },

  productReview: {
    fontSize: "1.5rem",
  },
}));

function Main() {
  const classes = useStyles();
  // const [products, setProduct] = useState([]);
  const productList = useSelector((state) => state.productList);
  // notice, the above steps is use connect and mapStateToProps to get
  // the appState to local component in is main
  const { products, loading, error } = productList;
  const fetchProductsToAppState = useDispatch();
  //instead of create the actions in wrap it in a method then call the method again;
  // we use useDispatch to do the job

  useEffect(() => {
    // const fetchData = async () => {
    //   const { data } = await axios.get("http://localhost:5000/api/products");
    //   setProduct(data);
    //   console.log(data);
    // };
    // try {
    //   fetchData();
    // } catch (err) {
    //   console.log(err);
    // }
    // instead of doing above, I am going to use redux hook to call the redux action and
    // then update all the global state which contains the product information
    fetchProductsToAppState(listProducts());
  }, []);
  //above code is basically equal to componentDidMount; it says when the state is empty, run
  // the function above
  // the action creatorThen dispatch certain actions and within that action creator; you run side effect making ajax called and get the data back

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>error.message</div>
  ) : (
    <main>
      <ul style={{ margin: "0", padding: "0" }}>
        <Grid
          //   justify={"space-evenly"}
          className={classes.productsContainer}
          container
          spacing={5}
        >
          {products.map((product) => (
            <Grid
              key={product._id}
              xs={12}
              md={6}
              lg={4}
              className={classes.productItem}
              item
            >
              <Card className={classes.cardContainer}>
                <CardMedia
                  className={classes.cardImage}
                  image={product.image}
                />
                <CardContent>
                  <Typography className={classes.productName}>
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </Typography>
                  <Typography className={classes.productBrand}>
                    {product.brand}
                  </Typography>
                  <Typography className={classes.productPrice}>$60</Typography>
                  <Typography className={classes.productReview}>
                    Ratings: {product.rating} Reviews: {product.numReviews}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ul>
    </main>
    // the above logis is a bit convuloted:
    // basically it says if the loading is not true; there is nothing to return;
    // if the loading is not true; check whether there is an error:
    // if there is an error: display the error;
    // if there is no error: display the content;
  );
}

export default Main;
