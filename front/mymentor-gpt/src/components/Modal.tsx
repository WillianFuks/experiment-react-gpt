import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCheck } from 'react-icons/fi';

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return (
    <div className="z-[90] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Confirm logout?</h2>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-500 hover:text-white px-4 py-2 rounded flex"
            onClick={handleCancel}
          >
            <FiX size={20} />
            <span>Cancel</span>
          </button>
          <button
            className="bg-red-500 hover:bg-red-900 text-white px-4 py-2 rounded flex"
            onClick={handleOk}
          >
            <FiCheck size={20} />
            <span>OK</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
