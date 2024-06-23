import axios from "axios";
import DefaultImage from "../img/default.jpg";
import LoginPopup from "../popUp/loginPopUp";
import React, { useState } from "react";

type ProductProps = {
  item: {
    name: string;
    image: string;
    description: string;
    price: string;
    id: number;
    discount: number; // Assuming each product has an ID
  };
};

function ProductCard(props: ProductProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const handleAddToCart = () => {
    const authToken = localStorage.getItem("token");
     const customerId = localStorage.getItem("customerId");

    axios
      .post("http://localhost:8000/AddToCart", {
        Auth: authToken,
        customer_id: parseInt(customerId ?? ''), // Example customer ID (replace with actual)
        product_id: props.item.id, // Assuming 'id' is the product ID
        qty: 1
      })
      .then((response) => {
        alert("Product added to cart");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        // Handle error, display error message, or provide user feedback
      });
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleClickProduct = () => {
    window.location.href = `/ProductDetail/${props.item.id}`;
  };

  return (
    <>
      <div className=" min-w-[200px] h-[366px] shadow-lg flex flex-col py-4 bg-white rounded-md">
        <img
          crossOrigin="anonymous"
          src={props.item.image}
          alt="Product Image"
          className=" w-[200px] h-[200px]"
          onClick={handleClickProduct}
        />
        <div className="flex flex-col gap-2 p-1">
          <div
            className="font-bold text-xl"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}>
            {props.item.name}
          </div>

          <p
            className="text-gray-700 text-base"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}>
            {props.item.description}
          </p>
          <p
            className="text-gray-900 text-base mt-2"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}>
            {props.item.price}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
            onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      {/* <LoginPopup isOpen={isLoginOpen} onClose={handleCloseLogin} /> */}
    </>
  );
}

export default ProductCard;
