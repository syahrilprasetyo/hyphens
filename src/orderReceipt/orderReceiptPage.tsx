import React, { useEffect, useState } from "react";
import Nav from "../home/nav";

import iconCopy from "../assets/copy-icon.svg";
import iconArrow from "../assets/Arrow.svg";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderReceiptPage = () => {
  // Assume you have received order details from the backend or a state management system

  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    fetchOrder();
  }, [id, token]);

  const fetchOrder = () => {
    const url = "http://localhost:8000/OrderReceipt";
    const data = {
      Auth: token,
      order_id: parseInt(id ?? ""),
    };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);

        setExpeDate(response.data.data.exp_date);
        setExpDateFormat(response.data.data.exp_date);

        setDetailPayment(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [expDate, setExpeDate] = useState(String);
  const [expDateFormat, setExpDateFormat] = useState(Date);
  const [detailPayment, setDetailPayment] = useState({
    total_amount: "",
    exp_date: "",
    bank_name: "",
    no_rek: "",
  });





  const formatDate = (expDateFormat: string | number | Date) => {
    const date = new Date(expDateFormat);

    const day = date.getUTCDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Ensure minutes are two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day} ${month} ${year} ${hours}:${formattedMinutes}`;
  };

  // Example usage:
  const [deadLine, setDeadLine] = useState(formatDate(expDateFormat));
  // Output: "24 May 2024 13:42"

  const calculateTimeLeft = () => {
    const difference = +new Date(expDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval as keyof typeof timeLeft]} {interval}{" "}
      </span>
    );
  });

  return (
    <>
      <Nav />
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center gap-10">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Order Receipt
        </div>
        <div className="w-[1120px] px-[80px] py-0 gap-[48px] flex flex-row justify-center content-center ">
          <div className="w-[612px] rounded border  flex flex-col p-1 ">
            <div className="h-[140px] p-6flex flex-col justify-center content-center">
              <div className="text-center font-poppins font-bold text-base  leading-[36px]">
                Finish your payment
              </div>
              <div className=" text-center font-poppins font-normal text-base leading-[36px]">
                before, {deadLine}
              </div>
              <div className="text-center text-[#FF8A00] font-poppins text-2xl font-normal leading-[36px]">
                {timerComponents.length ? (
                  timerComponents
                ) : (
                  <span>Time's up!</span>
                )}
              </div>
            </div>
            <hr />

            <div className="flex flex-col justify-center content-center  p-6 gap-6">
              <div className=" h-[208px] flex flex-col  gap-6">
                <div className="flex flex-row justify-between">
                  <div>Payment Method</div>
                  <div>{detailPayment.bank_name} Transfer</div>
                </div>
                <div className=" flex flex-col">
                  <div>No Rekening</div>
                  <div className="flex flex-row justify-between">
                    <div>{detailPayment.no_rek}</div>
                    <div className=" flex flex-row gap-2">
                      <div>Copy</div>
                      <img src={iconCopy} className="h-6 w-6" alt="" />
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col">
                  <div>Payment Nominal</div>
                  <div className="flex flex-row justify-between">
                    <div>Rp {detailPayment.total_amount}</div>
                    <div className=" flex flex-row gap-2">
                      <div>Copy</div>
                      <img src={iconCopy} className="h-6 w-6" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="font-bold text-xl font-poppins">
                Payment Steps
              </div>
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-base font-bold font-poppins">
                      Bank Transfer
                    </h2>
                    <img src={iconArrow} alt="Arrow Icon" />
                  </div>
                  <ol className="list-decimal ml-4">
                    <li>Enter your ATM card & PIN</li>
                    <li>Select the Transfer menu</li>
                    <li>
                      Choose the option to transfer to another bank account
                    </li>
                    <li>Enter the recipient's bank account number</li>
                    <li>Enter the amount you wish to transfer</li>
                    <li>
                      On the confirmation page, verify the recipient's bank
                      account number, name, and the amount to be transferred
                    </li>
                    <li>Follow the instructions to complete the transaction</li>
                    <li>Save the transaction receipt as proof of payment</li>
                  </ol>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-base font-bold font-poppins">
                      mBanking Transfer
                    </h2>
                    <img src={iconArrow} alt="Arrow Icon" />
                  </div>
                  <ol className="list-decimal ml-4">
                    <li>
                      Open your mBanking app and log in using your credentials
                    </li>
                    <li>Select the Transfer menu</li>
                    <li>
                      Choose the option to transfer to another bank account
                    </li>
                    <li>Enter the recipient's bank account number</li>
                    <li>Enter the amount you wish to transfer</li>
                    <li>
                      On the confirmation page, verify the recipient's bank
                      account number, name, and the amount to be transferred
                    </li>
                    <li>Follow the instructions to complete the transaction</li>
                    <li>Save the transaction receipt as proof of payment</li>
                  </ol>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderReceiptPage;
