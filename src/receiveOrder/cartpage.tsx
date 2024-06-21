import React, { useEffect, useState } from "react";
import LoginPopup from "../popUp/loginPopUp";
import axios from "axios";
import DefaultImage from "../img/default.jpg";
import {  useNavigate } from "react-router-dom";

interface Product {
  id: number;
  customer_id: number;
  product_id: number;
  product_name: string;
  regular_price: string;
  discount: string | null;
  final_price: string;
  image: string;
  qty: number;
}

// Define the interface for the response data
interface ApiResponse {
  resultCd: number;
  message: string;
  result: boolean;
  data: {
    products: Product[];
    customerId: number;
  };
}

const CartPage = () => {

    const prd = {
      id: 1,
      name: "Sample Product",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque pretium sem ut dignissim.",
      price: 29.99,
      imageUrl: DefaultImage,
    };
  const [products, setProducts] = useState<Product[]>([]);
  const authToken = localStorage.getItem("token");
  const [customerId, setCustomerId] = useState(0);

  useEffect(() => {
    fetchProducts();
    
  }, []);

  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn) {
    alert("You must be logged in");
    window.location.href = "/Login";
  }

   

  const fetchProducts = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/CartDetail",
        {
          Auth: authToken,
        }
      );

      const productsData = response.data.data.products;
      setProducts(productsData);
      setCustomerId(response.data.data.customerId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const increaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, qty: product.qty + 1 } : product
      )
    );
  };


  const decreaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, qty: Math.max(1, product.qty - 1) }
          : product
      )
    );
  };

  const totalPrice = products.reduce((total, product) => {
    return total + parseInt(product.final_price) * product.qty;
  }, 0);

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
       alert("You must be logged in");
       window.location.href = "/Login";

    } else {
      axios
        .post("http://localhost:8000/Checkout", {
          Auth: authToken,
          cart_ids: products.map((product) => String(product.id)).join(", "),
          total_amount: String(totalPrice),
          // Example customer ID (replace with actual)
          // Assuming 'id' is the product ID
        })
        .then((response) => {

          console.log(response);
          window.location.href = "/Checkout";

          // Provide user feedback if needed
        })
        .catch((error) => {
          console.error("checkout detail:", error);
          // Handle error, display error message, or provide user feedback
        });
    }
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  // const navigate = useNavigate();

  return (
    <>
      {/* <div className="bg-white border-gray-200 dark:bg-gray-900 shadow-md fixed top-0 z-10 max-w-mvw w-full p-5 ">
        back
      </div> */}

      <div className="container mx-auto py-8">
        <div className="container mx-auto py-8">
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex flex-col gap-2">
                    <img
                      className="w-full md:w-64 h-64 object-cover object-center"
                      src={prd.imageUrl}
                      alt={product.product_name}
                    />
                    <h2 className="text-lg font-semibold mb-2">
                      {product.product_name}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Price: ${product.final_price}
                    </p>
                    <div className="flex flex-row justify-between">
                      <div>Total Price: ${product.final_price}</div>
                      <div className="flex flex-row gap-2">
                        <button onClick={() => increaseQuantity(product.id)}>
                          +
                        </button>
                        <span>{product.qty}</span>
                        <button onClick={() => decreaseQuantity(product.id)}>
                          -
                        </button>
                      </div>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <div className="flex flex-row gap-2 justify-center content-center align-middle text-center">
                <div className="flex flex-col text-center justify-center content-center align-middle">
                  Total Price All Product : ${totalPrice}
                </div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <LoginPopup isOpen={isLoginOpen} onClose={handleCloseLogin} /> */}
    </>
  );
};

export default CartPage;
