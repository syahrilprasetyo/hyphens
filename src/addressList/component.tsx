// AddressList.js
import React from "react";

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

interface Props {
  addresses: Address[];
  onSelectAddress: (address: Address) => void;
}

const AddressList: React.FC<Props> = ({ addresses, onSelectAddress }) => {
  return (
    <div className="address-list">
      <h2 className="text-lg font-semibold mb-4">Choose an Address:</h2>
      <ul>
        {addresses.map((address, index) => (
          <li key={index} className="mb-4 border rounded p-4">
            <div className="font-semibold">{address.full_name}</div>
            <div>{address.address}</div>
            <div>
              {address.city}, {address.country} {address.zipCode}
            </div>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onSelectAddress(address)}>
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
