import d1 from "./resources/product_images/d1.jpg";

export default {
  products: [
    {
      _id: "1",
      name: "Iphone 11 Pro Max",
      category: "Mobile Phones",
      image: { d1 },
      price: 1800,
      brand: "Apple",
      rating: 4.5,
      numReviews: 10,
    },
    {
      _id: "2",
      name: "Google Pixel4 XL",
      category: "Mobile Phones",
      image: "./resources/product_images/d1.jpg",
      price: 1298,
      brand: "Google",
      rating: 4.2,
      numReviews: 5,
    },
    {
      _id: "3",
      name: "One Plus 8",
      category: "Mobile Phones",
      image: "./resources/product_images/d1.jpg",
      price: 1250,
      brand: "One Plus",
      rating: 4.5,
      numReviews: 8,
    },
    {
      _id: "4",
      name: "Macbook Pro 13 Inches",
      category: "Laptops",
      image: "./resources/product_images/d1.jpg",
      price: 2120,
      brand: "Apple",
      rating: 4.5,
      numReviews: 8,
    },
  ],
};
