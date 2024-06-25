import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiOutlinePartition } from "react-icons/ai";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (item: string) => () => {
    setIsSidebarOpen(false);
    setActiveItem(item);
  }

  return (
    <div>
      {!isSidebarOpen &&
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md sm:hidden"
      >
        <FaBars size={24} />
      </button>}
      <div
        className={`fixed top-0 left-0 sm:static w-64 bg-gray-800 text-white transition-transform transform h-full
                    ${ isSidebarOpen ? 'translate-x-0' : '-translate-x-full' } sm:translate-x-0`
        }
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 sm:hidden"
          >
            <FaTimes size={24} />
          </button>

          <h2 className="text-xl font-semibold text-center">Menu</h2>
          <ul className="text-xl">
            <li className={`my-2 py-2 ${activeItem === 'slot' ? 'rounded bg-gray-100 bg-opacity-50' : ''}`}>
              <Link
                to="/consult/swot"
                className={`hover:text-blue-300 flex items-center gap-1`}
                onClick={handleMenuItemClick('slot')}
              >
                <AiOutlinePartition size={20}/>
                <p>SWOT</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 opacity-100 sm:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
