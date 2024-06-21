import axios from "axios";
import React, { useState } from "react";

const ReceiveOrderPage = () => {
   const authToken = localStorage.getItem("token");
  const [shippingInfo, setShippingInfo] = useState({
    Auth: authToken,
    fullName: "",
    email: "",
    address: "",
    no_telp: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle submission, such as sending the order and redirecting to a confirmation page
    console.log("Shipping Info:", shippingInfo);
    // Redirect or show success message

     axios
       .post("http://localhost:8000/Address/Add", 
        shippingInfo

         // Example customer ID (replace with actual)
         // Assuming 'id' is the product ID
       )
       .then((response) => {
         console.log(response);
          alert("add address successfully");
         window.location.href = "/Checkout";

         // Provide user feedback if needed
       })
       .catch((error) => {
         console.error("add address:", error);
         // Handle error, display error message, or provide user feedback
       });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Add new address</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="no_telp"
            className="block text-gray-700 text-sm font-bold mb-2">
            No telp
          </label>
          <input
            type="text"
            id="no_telp"
            name="no_telp"
            value={shippingInfo.no_telp}
            onChange={handleInputChange}
            placeholder="Enter your no_telp"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="zipCode"
            className="block text-gray-700 text-sm font-bold mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleInputChange}
            placeholder="Enter your ZIP code"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default ReceiveOrderPage;
