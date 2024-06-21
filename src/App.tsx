import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home/home";
import ProductsPage from "./products/productPage";
import AboutUs from "./about/aboutUsPage";
import ContactUs from "./contact/contactPage";
import LoginPage from "./login/loginPage";
import CartPage from "./cart/cartpage";
import CheckoutPage from "./checkoutPage/checkoutPage";
import ProcessPaymentPage from "./payment/paymentPage";
import ChoosePaymentMethodPage from "./payment/paymentPage";
import ReceiveOrderPage from "./receiveOrder/receiveOrderPage";
import OrderReceiptPage from "./orderReceipt/orderReceiptPage";
import MessagePage from "./message/messagePage";
import ChatsPage from "./inbox/inbox";
import ProductDetailPage from "./productDetail/productDetailPage";
import RegistrationPage from "./registration/registrationPage";
import Address from "./addressList/addressList";
import ChatApp from "./message/messagePage";
import RoomChat from "./message/messagePage";
// import SuccessPopup from "./popUp/popUpSucccess";
// import "./crisp.js";

function App() {

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/Payment" element={<ChoosePaymentMethodPage />} />
        <Route path="/ReceiveOrder" element={<ReceiveOrderPage />} />
        <Route path="/OrderReceipt/:id" element={<OrderReceiptPage />} />
        <Route path="/Inbox" element={<ChatsPage />} />
        <Route path="/ProductDetail/:id" element={<ProductDetailPage />} />
        <Route path="/Registration" element={<RegistrationPage />} />
        <Route path="/AddressList" element={<Address />} />
      </Routes>
    </Router>
  );
}

export default App;

