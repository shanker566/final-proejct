import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CityList from "./pages/CityList.jsx";
import CityDetails from "./pages/CityDetails.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
        {/* 🌆 NAVBAR */}
        <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Left Side - Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <span role="img" aria-label="city">🏙️</span> Smart City Portal
            </Link>

            {/* Right Side - Navigation Links */}
            <nav className="flex items-center gap-6 text-gray-700 font-medium">
              <Link to="/" className="hover:text-blue-700 transition-colors">
                Home
              </Link>
              <Link to="/cities" className="hover:text-blue-700 transition-colors">
                Cities
              </Link>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-300"></div>

              {/* Admin Links */}
              <Link
                to="/admin/login"
                className="hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/admin/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Register
              </Link>
            </nav>
          </div>
        </header>

        {/* 🧭 MAIN CONTENT */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cities" element={<CityList />} />
            <Route path="/city/:id" element={<CityDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* ⚓ FOOTER */}
        <footer className="bg-white text-gray-600 text-center py-4 shadow-inner">
          © {new Date().getFullYear()} Smart City Portal. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
