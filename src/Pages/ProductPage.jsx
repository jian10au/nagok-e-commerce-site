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
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../actions/productActions";

const ProductPage = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDiaglog] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const productUpdate = useSelector((state) => state.productUpdate);
  const productDelete = useSelector((state) => state.productDelete);
  // basically pull out the details from the objects managed by each reducer
  // get the reducer data from redux;

  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = productCreate;

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!id) {
      console.log("going to create the product");
      dispatch(
        createProduct({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          setCountInStock,
          description,
        })
      );
    } else {
      dispatch(
        updateProduct({
          _id: id,
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          setCountInStock,
          description,
        })
      );
    }
  };

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const populateProductDetails = (product) => {
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setBrand(product.brand);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };

  useEffect(() => {
    console.log(productList, "what is product list?");
    // if (userInfo) {
    // }

    // why this way it works, as at the beginning, it is an undefined value;
    dispatch(listProducts());
  }, [successCreate, successUpdate, successDelete]);

  console.log("rendered");
  console.log(productUpdate, "product update");
  console.log(productUpdate.success, "what is the success of product update");

  return (
    <div>
      <div>Manage the products and categories</div>
      <Button
        variant="contained"
        onClick={() => {
          populateProductDetails({});
          // this is a good setup
          // this essentially clear the old state and set it to empty
          setOpenDiaglog(true);
        }}
      >
        Create New Product
      </Button>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell component="th" scope="row">
                    {product._id}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.category}</TableCell>
                  <TableCell align="right">{product.brand}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        populateProductDetails(product);
                        setOpenDiaglog(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteProduct(product)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDiaglog(false)}>
        <DialogTitle>Provide Product Details Below</DialogTitle>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name"
            value={name}
            variant="filled"
            onChange={(event) => setName(event.target.value)}
            label="name"
          />
          <br />
          <TextField
            id="price"
            value={price}
            variant="filled"
            onChange={(event) => setPrice(event.target.value)}
            label="price"
          />
          <br />
          <TextField
            id="image"
            value={image}
            variant="filled"
            onChange={(event) => setImage(event.target.value)}
            label="image"
          />
          <br />
          <TextField
            id="brand"
            value={brand}
            variant="filled"
            onChange={(event) => setBrand(event.target.value)}
            label="brand"
          />
          <br />
          <TextField
            id="category"
            value={category}
            variant="filled"
            onChange={(event) => setCategory(event.target.value)}
            label="category"
          />
          <br />
          <TextField
            id="countInStock"
            value={countInStock}
            variant="filled"
            onChange={(event) => setCountInStock(event.target.value)}
            label="countInStock"
          />
          <br />
          <TextField
            id="description"
            value={description}
            variant="filled"
            onChange={(event) => setDescription(event.target.value)}
            label="description"
          />
          <br />
          <Button variant="contained" type="submit">
            {id ? "update" : "create"}
          </Button>
        </form>
      </Dialog>
    </div>
  );
};

export default ProductPage;
