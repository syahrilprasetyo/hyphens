import React from "react";
import DefaultImage from "../img/default.jpg";
import axios from "axios";
import ProductCard from "./productCard";

type gridComponent = {
  items: {
    id: number;
    name: string;
    image: string;
    description: string;
    price: string;
    discount: number;
  }[];
};

function GridComponent(props: gridComponent) {
  const { items } = props;

  const handleAddToCart = (id: number) => {

    console.log("handle")
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("You must be logged in");
      window.location.href = "/Login";
    }

    axios
      .post("http://localhost:8000/AddToCart", {
        Auth: isLoggedIn,
        customer_id: 2, // Example customer ID (replace with actual)
        product_id: id, // Assuming 'id' is the product ID
      })
      .then((response) => {
        console.log("Product added to cart:", response.data);
        alert("Product added to cart");
        // Provide user feedback if needed
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        // Handle error, display error message, or provide user feedback
      });
  };

  return (
    <div className="grid grid-cols-5 gap-6 ">
      {/* Map through items and render each item */}
      {items.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </div>
  );
}

export default GridComponent;
