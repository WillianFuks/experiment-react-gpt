import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/Login.tsx'
import ConsultPage from './pages/Consult.tsx'
import SwotPage from './pages/Swot.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="consult" element={<ProtectedRoute component={ ConsultPage } />} >
          <Route path="swot" element={<ProtectedRoute component={ SwotPage } />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
