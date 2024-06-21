import React, { useEffect, useState } from "react";
import AddressList from "./component";
import axios from "axios";

interface Address {
  id: number;
  customer_id: number;
  email: string;
  no_telp: string;
  address: string;
  full_name: string;
  city: string;
  country: string;
  zipCode: string;
}

// Define the interface for the response data
interface ApiResponse {
  resultCd: number;
  message: string;
  result: boolean;
  data: {
    address: Address[];
  };
}

const Address = () => {
  const authToken = localStorage.getItem("token");
  const [products, setProducts] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/Address/List",
        {
          Auth: authToken,
        }
      );

      const productsData = response.data.data.address;
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    // Do something with the selected address, such as updating state in a parent component
  };

  const handleSaveAddress = () => {
    // Add functionality to save the selected address
    if (selectedAddress) {
      console.log("Selected address saved:", selectedAddress);

      axios
        .post("http://localhost:8000/Checkout", {
          Auth: authToken,
          address_id: selectedAddress?.id,
        })
        .then((response) => {
          console.log(response);
          window.location.href = "/Checkout";
        })
        .catch((error) => {
          console.error("checkout detail:", error);
          // Handle error, display error message, or provide user feedback
        });
    } else {
      console.log("No address selected");
    }
  };

  const handleAddAddress = () => {
    // Add functionality to save the selected address
    window.location.href = "/ReceiveOrder";
  };

  return (
    <div className="app p-4">
      <AddressList addresses={products} onSelectAddress={handleSelectAddress} />
      <div className="selected-address mt-4 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Selected Address:</h2>
        {selectedAddress && (
          <>
            <div className="font-semibold">{selectedAddress.full_name}</div>
            <div>{selectedAddress.address}</div>
            <div>
              {selectedAddress.city} {selectedAddress.country}{" "}
              {selectedAddress.zipCode}
            </div>
          </>
        )}
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveAddress}>
          Save
        </button>
      </div>
      <button
        className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddAddress}>
        Add Address
      </button>
    </div>
  );
};

export default Address;
