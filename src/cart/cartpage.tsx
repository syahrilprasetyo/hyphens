import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultImage from "../img/default.jpg";
import Nav from "../home/nav";
import trashIcon from "../assets/trash-blank-svgrepo-com.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
    return total + parseFloat(product.final_price) * product.qty;
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
        })
        .then((response) => {
          console.log(response);
          window.location.href = "/Checkout";
        })
        .catch((error) => {
          console.error("checkout detail:", error);
        });
    }
  };

   const navigate = useNavigate();

   const handleStartShopping = () => {
     navigate("/Products");
   };

  return (
    <>
      <Nav />
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center gap-10">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Cart
        </div>
        <div className="w-[1120px] h-[344px] px-[80px] py-0 gap-[48px] flex flex-row">
          <div className="w-[612px] h-[344px] gap-[24px] flex flex-col">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="w-[612px] h-[160px] gap-3 flex flex-row">
                  <img
                    src={product.image}
                    alt=""
                    className="h-[160px] w-[160px]"
                  />
                  <div className="w-[440px] h-[160px] gap-2 flex flex-col">
                    <div className="w-[440px] h-[112px] gap-2 flex flex-col">
                      <div>{product.product_name}</div>
                      <div className="flex flex-col">
                        <div>Rp. {product.final_price}</div>
                        <div>Rp. {product.regular_price} -10%</div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end content-end">
                      <div className="flex flex-row w-[164px] h-[40px] gap-3">
                        <div className="w-[128px] h-[40px] gap-0 rounded-lg border flex flex-row justify-between cursor-pointer focus:outline-none">
                          <div
                            className="p-2"
                            onClick={() => increaseQuantity(product.id)}>
                            +
                          </div>
                          <div className="p-2">{product.qty}</div>
                          <div
                            onClick={() => decreaseQuantity(product.id)}
                            className="p-2">
                            -
                          </div>
                        </div>
                        <div className="flex flex-col justify-center content-center">
                          <img
                            src={trashIcon}
                            alt=""
                            className="h-6 w-6 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-[1120px] h-[344px] px-[80px] py-0 gap-[48px] flex flex-row justify-center ">
                <div className="flex flex-col items-center justify-center ">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-gray-400 text-6xl mb-4"
                  />
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button
                    onClick={handleStartShopping}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
          {products.length > 0 && (
            <div className="w-[300px] h-[168px] gap-3 rounded-xl flex flex-col shadow-md shadow-slate-300 justify-center content-center p-6">
              <div className="h-[64px] w-full flex flex-col justify-center content-center">
                <div className="text-end">Total:</div>
                <div className="text-end">Rp. {totalPrice}</div>
              </div>
              <div className="flex flex-row justify-center content-center">
                <button
                  onClick={handleCheckout}
                  className="w-[252px] h-[44px] gap-0 rounded-3xl bg-[#1271FF]">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
