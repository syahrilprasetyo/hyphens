import axios from "axios";
import React, { useEffect, useState } from "react";
import LogoHyphens from "../img/hyphens.jpg";
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

interface Address {
  id: number;
  customer_id: number;
  email: string;
  noTelp: string;
  address: string;
  fullName: string;
  city: string;
  country: string;
  zipCode: string;
}

interface CourierList {
  id: number;
  name: string;
  time: string;
  price: number;
}

// Define the interface for the response data
interface ApiResponse {
  resultCd: number;
  message: string;
  result: boolean;
  data: {
    products: Product[];
    address: Address[];
    courierList: CourierList[];
    checkoutId: number;
    total_amount: number;
  };
}

const CheckoutPage = () => {
  const authToken = localStorage.getItem("token");
  const [products, setProducts] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [courierList, setCourierList] = useState<CourierList[]>([]);
  const [address, setAddress] = useState<Address>();
  const [checkoutId, setCheckoutId] = useState<number>();
  const [totalAmount, setTotalAmount] = useState<number>();

  useEffect(() => {
    fetchProducts();
    fetchAddress();
    fetchCourierList();
  }, []);

  const fetchProducts = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/CheckoutDetail",
        {
          Auth: authToken,
        }
      );

      const productsData = response.data.data.products;
      const address = response.data.data.address;

      setCheckoutId(response.data.data.checkoutId);
      setTotalAmount(response.data.data.total_amount);

      setProducts(productsData);
      // setAddress(address);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // State for receiver's information
  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Function to handle input changes for receiver's information
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setReceiverInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + parseInt(product.final_price) * product.qty;
    }, 0);
  };

  const handlePayment = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("You must be logged in");
      window.location.href = "/Login";
    } else {
      window.location.href = "/Payemnt";
    }
  };

  const handleAddress = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("You must be logged in");
      window.location.href = "/Login";
    } else {
      window.location.href = `/AddressList`;
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/Address/List",
        {
          Auth: authToken,
        }
      );

      setAddresses(response.data.data.address);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(Number);

  const handleAddressClick = (index: number) => {
    setSelectedAddressIndex(index);
  };

  const [selectedShipment, setSelectedShipment] = useState(Number);
  const [deliveryFee, setDeliveryFee] = useState(Number);
  const [totalPrice, setTotalPrice] = useState(Number);

  const handleCLickShipment = (index: number, price: number) => {
    setSelectedShipment(index);
    setDeliveryFee(price);
  };

  useEffect(() => {
    setTotalPrice(deliveryFee + (totalAmount ?? 0));
  }, [deliveryFee]);

  const fetchCourierList = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/Courier/List",
        {
          Auth: authToken,
        }
      );

      setCourierList(response.data.data.courierList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClickSelectPayment = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("You must be logged in");
      window.location.href = "/Login";
    } else {
      axios
        .post("http://localhost:8000/Checkout", {
          Auth: authToken,
          courier_id: selectedShipment,
          total_amount: String(totalPrice),
          address_id: selectedAddressIndex,
        })
        .then((response) => {
          console.log(response);
          window.location.href = "/Payment";
        })
        .catch((error) => {
          console.error("checkout detail:", error);
        });
    }
  };

  const navigate = useNavigate();
  const handleAddAddress = () => {
    navigate("/ReceiveOrder");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md fixed top-0 z-10 max-w-mvw w-full  ">
        <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4 h-[96px] ">
          <a href="#" className="flex items-center">
            <img src={LogoHyphens} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-bold font-sans whitespace-nowrap dark:text-white italic">
              Hyphens
            </span>
          </a>
        </div>
      </nav>

      <div className="mt-6"></div>
      <div className="flex flex-col px-[120px] h-full py-[120px] justify-center content-center gap-10">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Checkout
        </div>

        <div className="w-[1120px] px-20 gap-12 flex flex-row">
          <div className="w-[612px]  gap-6 flex flex-col">
            <div className="w-[612px]  rounded-xl border shadow-md bg-white flex flex-col">
              <div className="w-[612px] h-[78px] p-6 gap-2 flex flex-col justify-center content-center">
                <div className="w-[564px] h-[30px] font-poppins text-2xl font-bold leading-[30px] text-left">
                  Select Address
                </div>
              </div>
              <hr />

              <div className="w-[612px] p-6 gap-6 flex flex-col ">
                {/* button add new address */}
                <div className="w-[218px] h-[44px] p-[10px 24px] gap-1 rounded-3xl  bg-[#E0EDFF] flex flex-col justify-center content-center items-center">
                  <div
                    className="flex flex-row font-poppins text-base font-semibold leading-[24px] text-left text-[#1271FF] gap-1"
                    onClick={handleAddAddress}>
                    <div>+</div>
                    <div>Add new address</div>
                  </div>
                </div>

                {addresses.length > 0 &&
                  addresses.map((address) => (
                    <div
                      className="w-[564px] gap-3  flex flex-row cursor-pointer focus:outline-none "
                      onClick={() => handleAddressClick(address.id)}>
                      <div className="w-6 h-6  flex flex-col">
                        <div className="w-6 h-6 border rounded-3xl border-gray-400 flex flex-col justify-center content-center items-center">
                          {/* if one of address clicked it should be show */}
                          {address.id === selectedAddressIndex && (
                            <div className="w-3 h-3  rounded-3xl bg-[#FF8A00]"></div>
                          )}
                        </div>
                      </div>

                      <div className="w-[528px] h-[112px] gap-2  flex flex-col">
                        <div className="w-[528px] h-[24px] font-poppins text-lg font-bold leading-[24px] text-left">
                          {address.fullName}
                        </div>

                        <div className=" flex flex-col">
                          <div>{address.noTelp}</div>
                          <div>{address.address}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* shipment list */}
            <div className="w-[612px]  rounded-xl border shadow-md bg-white flex flex-col">
              <div className="w-[612px] h-[78px] p-6 gap-2 flex flex-col justify-center content-center">
                <div className="w-[564px] h-[30px] font-poppins text-2xl font-bold leading-[30px] text-left">
                  Select Shipment
                </div>
              </div>
              <hr />
              <div className="flex flex-col p-6 gap-6">
                {/* looping shipments from array                */}

                {courierList.length > 0 &&
                  courierList.map((data) => (
                    <div
                      className="w-[564px] gap-3  flex flex-row cursor-pointer focus:outline-none "
                      onClick={() => handleCLickShipment(data.id, data.price)}>
                      <div className="w-6 h-6  flex flex-col">
                        <div className="w-6 h-6 border rounded-3xl border-gray-400 flex flex-col justify-center content-center items-center">
                          {selectedShipment === data.id && (
                            <div className="w-3 h-3  rounded-3xl bg-[#FF8A00]"></div>
                          )}
                        </div>
                      </div>

                      <div className="w-[528px]  gap-2  flex flex-row justify-between">
                        <div className=" flex flex-row gap-2">
                          <div className="h-[24px] font-poppins text-lg font-bold leading-[24px] text-left">
                            {data.name}
                          </div>
                          <div>{data.time}</div>
                        </div>
                        <div>Rp {data.price}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-[300px] h-[264px] p-6 gap-6 rounded-xl border shadow-md flex flex-col ">
            <div className="flex flex-col gap-3">
              <div className=" flex flex-row justify-between">
                <div>item:</div>
                <div>Rp. {totalAmount}</div>
              </div>
              <div className=" flex flex-row justify-between">
                <div>shipment:</div>
                <div>Rp. {deliveryFee}</div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-end">Total</div>
              <div className="text-end">Rp. {totalPrice}</div>
            </div>
            <button
              className="w-[252px] h-[44px] rounded-3xl bg-[#1271FF] text-center font-poppins font-semibold text-lg leading-6 text-white"
              onClick={handleClickSelectPayment}>
              Select Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
