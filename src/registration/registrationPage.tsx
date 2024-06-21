import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    type: "customer",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const validationErrors = validate();

    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      // Make an HTTP POST request to your backend API
      const response = await axios.post(
        "http://localhost:8000/Registration/submit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful (status code 200)
      if (response.data.status === 200) {
        // If successful, reset the form fields
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          type: "customer"
        });
        console.log("Registration successful!");
      } else {
        // If request failed, log the error message
        console.error("Registration failed:", response.statusText);
      }
      setErrors({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

const validate = () => {
  const newErrors = {
    name: !formData.name ? "Name is required" : "",
    username: !formData.username ? "Username is required" : "",
    email: !formData.email
      ? "Email is required"
      : !/\S+@\S+\.\S+/.test(formData.email)
      ? "Email is invalid"
      : "",
    password: !formData.password ? "Password is required" : "",
  };

  if (newErrors.email != "" || newErrors.name  != "" || newErrors.username != "" || newErrors.password != "") return newErrors;
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
