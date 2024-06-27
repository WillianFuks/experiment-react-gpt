import React, { useState } from 'react';
import Modal from './Modal';
import { TbLogout } from "react-icons/tb";
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1] || '';

  return (
    <nav className="bg-gray-900 p-4 flex justify-between w-full h-20 items-center">
      {lastSegment && <p className="text-white">{lastSegment.toUpperCase()}</p>}
      <button
        className="ml-auto bg-white text-blue-500 px-4 py-2 rounded flex hover:bg-cyan-700 hover:text-white gap-1 items-center"
        onClick={handleOpenModal}
      >
        <TbLogout size={25}/>
        <span>LogOut</span>
      </button>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} />
      )}
    </nav>
  );
};

export default Navbar;
