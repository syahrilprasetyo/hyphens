import React, { useEffect, useState } from "react";
import DefaultImage from "../img/default.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../home/nav";

interface Product {
  name: string;
  regularPrice: string;
  discount: number;
  finalPrice: string;
  images: [
    {
      id: number;
      url: string;
    }
  ];
  desc: string;
}

interface ApiResponse {
  resultCd: number;
  message: string;
  result: boolean;
  data: {
    product: Product;
  };
}

const ProductDetailPage = () => {
  // Assume you have product details in a variable or fetched from an API

  let { id } = useParams();
  const [products, setProducts] = useState<Product>();
  const [selectedImageId, setselectedImageId] = useState(Number);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/Product/Detail",
        {
          productId: id,
        }
      );

      const productsData = response.data.data.product;

      setProducts(productsData);

      // setAddress(address);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("You must be logged in");
      window.location.href = "/Login";
    }

    axios
      .post("http://localhost:8000/AddToCart", {
        Auth: isLoggedIn,
        // Example customer ID (replace with actual)
        product_id: parseInt(id ?? ""),
        qty: quantity, // Assuming 'id' is the product ID
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

  function handelSelectedImage(id: number) {
    setselectedImageId(id);
  }

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const subtotal = quantity * parseInt(products?.finalPrice ?? "");
  return (
    <>
      <Nav />
      <div className="mt-28"></div>
      <div className="flex justify-center content-center">
        <div className="w-[1120px] h-[544px] px-[80px] py-0 gap-[48px] flex flex-row">
          <div className="w-[672px] h-[544px] gap-[24px] flex flex-row">
            <div className="w-[320px] h-[412px] gap-3 flex flex-col">
              {selectedImageId > 0 ? (
                products?.images
                  .filter((image) => image.id === selectedImageId)
                  .map((data) => {
                    return (
                      <img
                        src={data.url}
                        alt=""
                        className="w-80 h-80 rounded-lg "
                      />
                    );
                  })[0]
              ) : (
                <img
                  src={products?.images.map((data) => data.url)[0]}
                  className="w-80 h-80 rounded-lg "
                />
              )}

              <div></div>
              <div className="w-[320px] h-[60px] gap-[12px]  flex flex-row">
                {products?.images
                  ? products?.images.map((data) => {
                      return (
                        <img
                          src={data.url}
                          alt=""
                          className="w-[60px] h-[60px] border-t border-l border-b border-solid border-black rounded-lg "
                          onClick={() => handelSelectedImage(data.id)}
                        />
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="w-[328px] h-[544px] gap-2  flex flex-col">
              <div className="h-[72px] w-[328px] ">
                <div className="font-poppins font-bold text-lg leading-9">
                  {products?.name}
                </div>
                <div className=" flex flex-col w-[328px] h-[60px] ">
                  <div className="flex flex-row">
                    <div className="font-poppins font-normal text-lg leading-[36px]">
                      Rp.
                    </div>
                    <div className="font-poppins font-normal text-lg leading-[36px]">
                      {products?.regularPrice}
                    </div>
                  </div>
                  {products?.discount != 0 ?? (
                    <div>
                      <div className="flex flex-row">
                        <div className="font-poppins font-normal text-base leading-[36px] text-[#A2A2A2]">
                          Rp.
                        </div>
                        <div className="font-poppins font-normal text-base leading-[36px] text-[#A2A2A2]">
                          {products?.finalPrice}
                        </div>

                        <div className="font-poppins font-normal text-base leading-[36px] text-[#FF8A00]">
                          {products?.discount}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className=" font-poppins font-normal text-xs leading-[18px] py-4">
                  {products?.desc}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[192px] h-full gap-1  flex">
            <div className="w-[240px] h-[208px] rounded-[12px] p-[24px] gap-[12px]  flex flex-col shadow-md shadow-[#c5c5c5]">
              <div className="w-[192px] h-[40px] rounded-[8px] border border-solid border-black flex flex-row justify-between p-2">
                <button
                  onClick={handleIncrease}
                  className="cursor-pointer focus:outline-none">
                  +
                </button>{" "}
                {/* Quantity increase button */}
                <div>{quantity}</div> {/* Quantity display */}
                <button
                  onClick={handleDecrease}
                  className="cursor-pointer focus:outline-none">
                  -
                </button>{" "}
                {/* Quantity decrease button */}
              </div>
              <div className="w-[192px] h-[52px] border-black flex flex-col">
                <div className="text-end">Subtotal:</div>
                <div className="text-end">RP. {subtotal}</div>
              </div>
              <div
                className="w-[192px] h-[44px] rounded-[24px] p-[10px 24px]  bg-[#1271FF] text-center justify-center content-center text-white cursor-pointer focus:outline-none"
                onClick={handleAddToCart}>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
