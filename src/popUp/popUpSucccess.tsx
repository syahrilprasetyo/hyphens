interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 shadow-md rounded-md p-6">
        <div className="text-green-600 text-xl mb-4">{message}</div>
        <button
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};
