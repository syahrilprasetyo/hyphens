import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoHyphens from "../img/hyphens.jpg";
import Hamburger_menu from "/Users/thefepi/Documents/hypens-pharma-indonesia/src/assets/hamburger-menu.svg";
import Close from "/Users/thefepi/Documents/hypens-pharma-indonesia/src/assets/icons8-close.svg";
import "/Users/thefepi/Documents/hypens-pharma-indonesia/src/home/sideBar.css";
import CartIcon from "../assets/cart-svgrepo-com.svg";
import UserIcon from "../assets/user-svgrepo-com.svg";
import ArrowIcon from "../assets/arrow-down-svgrepo-com.svg";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(true);
  };

  const handleCloseButton = () => {
    setIsOpen(false);
  };
  const logged = localStorage.getItem("token");

  useEffect(() => {
    if (logged) {
      axios
        .post(
          "http://localhost:8000/PreLoading",
          {
            Auth: logged,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setDataCustomer(response.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const [dataCustomer, setDataCustomer] = useState({
    name: "",
    image: "",
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // Remove other localStorage items if necessary
    navigate("/Login");
  };

   const handleLogin = () => {
     navigate("/Login");
   };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md fixed top-0 z-10 max-w-mvw w-full ">
        <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4 h-[96px] ">
          <a href="#" className="flex items-center">
            <img src={LogoHyphens} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-bold font-sans whitespace-nowrap dark:text-white italic">
              Hyphens
            </span>
          </a>

          <div className="flex flex-row justify-center content-center items-center ">
            <div className="font-poppins font-normal text-base leading-6">
              <NavLink
                className="transition-transform hover:scale-105 md:hidden"
                to={"/Cart"}>
                <img src={CartIcon} alt="" className="h-4" />
              </NavLink>
            </div>
            <button
              onClick={toggleSidebar}
              data-collapse-toggle="navbar-default"
              type="button"
              className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false">
              <img src={Hamburger_menu} alt="" />
            </button>
          </div>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <div className="font-medium flex flex-row w-1440  px-160 py-104 gap-6">
              <div className=" items-center justify-center flex">
                <NavLink
                  className="transition-transform hover:scale-105"
                  to={"/Home"}>
                  Home
                </NavLink>
                <div></div>
              </div>
              <div className=" items-center justify-center flex">
                <NavLink
                  to={"/About"}
                  className="transition-transform hover:scale-105">
                  About
                </NavLink>
              </div>
              <div className=" items-center justify-center flex">
                <NavLink
                  to={"/inbox"}
                  className="transition-transform hover:scale-105">
                  Consultation
                </NavLink>
              </div>
              <div className=" items-center justify-center flex">
                <NavLink
                  to={"/Products"}
                  className="transition-transform hover:scale-105">
                  Product
                </NavLink>
              </div>
              <div className=" items-center justify-center flex">
                <NavLink
                  to={"/Contact"}
                  className="transition-transform hover:scale-105">
                  Contact Us
                </NavLink>
              </div>
              <div className=" items-center justify-center flex  ">
                <NavLink to={"/Cart"}>
                  <img src={CartIcon} className="h-8" alt="Flowbite Logo" />
                </NavLink>
              </div>

              <div className=" items-center justify-center flex gap-4  border-">
                {dataCustomer.image && (
                  <img
                    src={dataCustomer.image}
                    alt=""
                    className="h-12 w-12  rounded-full"
                  />
                )}
                <div>{dataCustomer.name}</div>
                <div className="relative">
                  <img
                    src={ArrowIcon}
                    alt=""
                    className="h-6 w-6 cursor-pointer"
                    onClick={toggleProfileDropdown}
                  />
                  {isProfileOpen && (
                    <div className="absolute top-0 h-52 right-0 w-52 bg-white shadow-md rounded-md mt-5 p-4">
                      {/* Render user profile information here */}
                      <div className="flex flex-col items-center p-4 gap-4">
                        <div className="flex-col flex items-center">
                          {dataCustomer.image && (
                            <img
                              src={dataCustomer.image}
                              alt=""
                              className="h-12 w-12  rounded-full"
                            />
                          )}
                          <span>{dataCustomer.name}</span>
                        </div>
                        {localStorage.getItem("token") ? (
                          <button onClick={handleLogout}>Logout</button>
                        ) : (
                          <button onClick={handleLogin}>Login</button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`${
          isOpen
            ? "h-full transition-all duration-1000 top-0"
            : "h-0 transition-all duration-1000 top-full "
        } w-screen bg-black z-50 flex flex-col fixed py-10`}>
        <div className="w-full   px-2 flex flex-row justify-end content-end ">
          <img
            src={Close}
            alt=""
            onClick={handleCloseButton}
            className=" h-10"
          />
        </div>

        <div
          className={`h-full justify-center content-center ${
            isOpen == false ?? "bottom-0"
          } `}>
          <ul className={`font-medium  text-white flex flex-col gap-7 `}>
            <li
              className=" items-center justify-center flex"
              onClick={handleCloseButton}>
              <NavLink
                className="transition-transform hover:scale-105"
                to={"/Home"}>
                Home
              </NavLink>
            </li>
            <li
              className=" items-center justify-center flex"
              onClick={handleCloseButton}>
              <NavLink
                to={"/About"}
                className="transition-transform hover:scale-105">
                About
              </NavLink>
            </li>
            <li
              className=" items-center justify-center flex"
              onClick={handleCloseButton}>
              <NavLink
                to={"/Products"}
                className="transition-transform hover:scale-105">
                Product
              </NavLink>
            </li>
            <li
              className=" items-center justify-center flex"
              onClick={handleCloseButton}>
              <NavLink
                to={"/Contact"}
                className="transition-transform hover:scale-105">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
