import axios from "axios";
import React, { useState } from "react";
import bannerLoginImage from "../img/Main_Banner_login.jpg"
import logo from "../img/image_logo_login.png"
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async (formData: { email: string; password: string; }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/Login",
        formData
      );
      return response.data;

      
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem("customerId", response.data.customerId);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("email", response.data.email);
      console.log("Login successful:", response.data.message);
      window.location.href = "/Home"; 
      // Lakukan navigasi atau tindakan lain setelah login berhasil
    } catch (error) {
      console.error("Error logging in:", error);
      // Tampilkan pesan kesalahan kepada pengguna jika diperlukan
    }
  };

   const navigate = useNavigate();

   const handleStartShopping = () => {
     navigate("/Registration");
   };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-row justify-around">
      <img src={bannerLoginImage} className="w-full h-screen bg-black" alt="" />
      <div className="flex flex-col justify-center content-center w-full items-center">
        <div className=" w-[368px] h-[504px]  bg-white p-8 rounded-md shadow-md flex flex-col gap-4">
          <div className="w-full flex flex-row justify-center">
            <img src={logo} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md"
                type="email"
                id="email"
                name="email" // Tambahkan properti name
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md"
                type="password"
                id="password"
                name="password" // Tambahkan properti name
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button
              className="w-full bg-[#1271FF] text-white py-2 px-4 rounded-3xl hover:bg-blue-600 "
              type="submit">
              Login
            </button>
          </form>
          <button
            onClick={handleStartShopping}
            className="w-full bg-[#E0EDFF] text-[#1271FF] py-2 px-4 rounded-3xl hover:bg-blue-600">
            Don’t have account? <b>Register</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
