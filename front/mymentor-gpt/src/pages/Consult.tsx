import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function ConsultPage() {
  return (
    <>
      <div className="flex">
        <Sidebar/>
        <div className="flex flex-1 flex-col">
          <Navbar/>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default ConsultPage
