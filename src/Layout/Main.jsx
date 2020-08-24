import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { loadUserInfo } from "../actions/userAction";
import {
  updateSearchTerm,
  updateSortCriteria,
  updateFilterCategory,
  resetSortCriteria,
} from "../actions/pageAction";
import axios from "axios";
import { createSelector } from "reselect";
import {
  Paper,
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

// maybe use the memoized selector first in here and then use the selector down below;

const getSearchTerm = (state) => {
  return state.page.searchTerm;
};

const getProductListProducts = (state) => {
  return state.product.productList.products;
};

const getFilterCategory = (state) => {
  return state.page.filterCategory;
};

const getSortCriteria = (state) => {
  return state.page.sortCriteria;
};

const filteredProductList = createSelector(
  [getProductListProducts, getSearchTerm],
  (products, searchTerm) => {
    return products.filter((product) =>
      product.name.match(new RegExp(searchTerm, "i"))
    );
  }
);

const categorisedAndFilteredProductList = createSelector(
  [filteredProductList, getFilterCategory],
  (products, category) => {
    if (category === "") {
      return products;
    }
    return products.filter((product) => product.category === category);
  }
);

const sortedProductList = createSelector(
  [categorisedAndFilteredProductList, getSortCriteria],
  (products, criteria) => {
    switch (criteria) {
      case "review":
        console.log(criteria);
        return [...products].sort(
          (productA, productB) => productB.numReviews - productA.numReviews
        );
      case "lowest":
        return [...products].sort(
          (productA, productB) => productA.price - productB.price
        );
      case "highest":
        console.log("highest selector runs?");
        return products.sort(
          (productA, productB) => productB.price - productA.price
        );
    }
  }
);

function Main(props) {
  const classes = useStyles();

  // const user = useSelector((state) => state.user);
  const productList = useSelector((state) => state.product.productList);
  const { loading, error } = productList;
  const GroupedAndFilteredProductList = useSelector(sortedProductList);
  const dispatch = useDispatch();
  const [searchTerm, setsearchTerm] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSearchTerm(searchTerm));
  };

  const sortHandler = (e) => {
    e.preventDefault();

    //for the selected value i kind of don't really need to have the value store in the local state as
    //I did for the searchTerm
    dispatch(updateSortCriteria(e.target.value));
  };

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>error.message</div>
  ) : (
    <main>
      <ul style={{ margin: "0", padding: "0" }}>
        <form onSubmit={submitHandler}>
          <button>Search</button>
          <input onChange={(e) => setsearchTerm(e.target.value)}></input>
        </form>

        <p>Sort</p>
        <select name="sortOrder" onChange={sortHandler}>
          <option value="review">Number of Reviews</option>
          <option value="lowest">Lowest Price</option>
          <option value="highest">Highest Price</option>
        </select>

        <Grid className={classes.productsContainer} container spacing={5}>
          {GroupedAndFilteredProductList.map((product) => (
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
                  <Typography className={classes.productPrice}>
                    {product.price}
                  </Typography>
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
  );
}

export default Main;
