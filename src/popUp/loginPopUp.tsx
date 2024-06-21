import React from "react";
import Modal from "react-modal";

interface LoginPopupProps {
  isOpen: boolean; // Menetapkan tipe data boolean untuk properti isOpen
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  return (
    <div className="h-full w-screen bg-slate-500 fixed z-50">
      <h2>Please Log In</h2>
      {/* Tambahkan formulir login di sini */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default LoginPopup;
