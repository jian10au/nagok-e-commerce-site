import React, { useState } from "react";
import data from "../data";
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
  const classes = useStyles();
  const [orderQty, setOrderQty] = useState(0);

  const product = data.products.find((x) => x._id === props.match.params.id);

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    console.log(event.target.value);
    setOrderQty(event.target.value);
  };

  return (
    <>
      <Link to="/">Go Back</Link>
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

            <Typography>Qty: </Typography>
            <FormControl className={classes.formControl}>
              <NativeSelect
                className={classes.selectEmpty}
                value={orderQty}
                name="orderQty"
                onChange={handleChange}
                inputProps={{ "aria-label": "qty" }}
              >
                <option value="" disabled>
                  Placeholder
                </option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
                <option value={4}>Four</option>
                <option value={5}>Five</option>
              </NativeSelect>
              <FormHelperText variant="standard">
                Maximum 5 per order
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Add To Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductDetailsPage;
