import axios from "axios";
import React, { useEffect, useState } from "react";
import LogoHyphens from "../img/hyphens.jpg";

interface bankList {
  id: number;
  bankName: string;
  payment_fee: number;
}

interface ApiResponse {
  resultCd: number;
  message: string;
  result: boolean;
  data: {
    listOfbanks: bankList[];
  };
}

const ChoosePaymentMethodPage = () => {
  const [bankList, setBankList] = useState<bankList[]>([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [checkoutId, setCheckoutId] = useState();
  const [totalAmount, setTotalAmount] = useState<number>();
  const [deliveryFee, setDeliveryFee] = useState(Number);
  const [totalPrice, setTotalPrice] = useState(Number);
  const [paymentFee, setPaymentFee] = useState(Number);

  const handleMethodChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedMethod(e.target.value);
  };

  useEffect(() => {
    fetchProducts();
    fetchBankList();
   
  }, []);

  useEffect(() => {
    setTotalPrice(deliveryFee + (totalAmount ?? 0) + paymentFee);
  }, [deliveryFee, paymentFee]);

  const authToken = localStorage.getItem("token");
  const fetchProducts = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/CheckoutDetail",
        {
          Auth: authToken,
        }
      );

      const checkoutId = response.data.data.checkoutId;
      setCheckoutId(checkoutId);
      setTotalAmount(response.data.data.total_amount);
      setDeliveryFee(response.data.data.deliveryFee);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBankList = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/BankList",
        {
          Auth: authToken,
        }
      );

      setBankList(response.data.data.listOfbanks);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle submission, such as redirecting to the next step

    const data = {
      Auth: authToken,
      checkout_id: checkoutId,
      payment_methode_id: selectedBank,
      total_payment: totalPrice,
    };

    axios
      .post("http://localhost:8000/Order", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        window.location.href = "/OrderReceipt/" + response.data.data.order_id;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [selectedBank, setSelectedBank] = useState(Number);

  const handleSelectedbankId = (index: number, payment_fee: number) => {
    setSelectedBank(index);
    setPaymentFee(payment_fee);
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
          Payment
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
                <div className="font-poppins text-xl font-bold leading-[30px] text-left">
                  Virtual Account
                </div>

                {bankList.length > 0 &&
                  bankList.map((bank) => (
                    <div
                      className="w-[564px] gap-3  flex flex-row cursor-pointer focus:outline-none "
                      onClick={() =>
                        handleSelectedbankId(bank.id, bank.payment_fee)
                      }>
                      <div className="w-6 h-6  flex flex-col">
                        <div className="w-6 h-6 border rounded-3xl border-gray-400 flex flex-col justify-center content-center items-center">
                          {bank.id === selectedBank && (
                            <div className="w-3 h-3  rounded-3xl bg-[#FF8A00]"></div>
                          )}
                        </div>
                      </div>

                      <div className="w-[528px]  gap-2  flex flex-row justify-between">
                        <div className=" flex flex-row gap-2">
                          <div className="h-[24px] font-poppins text-lg font-bold leading-[24px] text-left">
                            {bank.bankName}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-[300px]  p-6 gap-6 rounded-xl border shadow-md flex flex-col ">
            <div className="flex flex-col gap-3">
              <div className=" flex flex-row justify-between">
                <div>Item:</div>
                <div>Rp. {totalAmount}</div>
              </div>
              <div className=" flex flex-row justify-between">
                <div>Shipment:</div>
                <div>Rp. {deliveryFee}</div>
              </div>
              <div className=" flex flex-row justify-between">
                <div>Payment Fee:</div>
                <div>Rp. {paymentFee}</div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-end">Total</div>
              <div className="text-end">Rp. {totalPrice}</div>
            </div>
            <button
              className="w-[252px] h-[44px] rounded-3xl bg-[#1271FF] text-center font-poppins font-semibold text-lg leading-6 text-white"
              onClick={handleSubmit}>
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePaymentMethodPage;
