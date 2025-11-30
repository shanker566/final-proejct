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
                className="bg-gradient-to-r from-accent-start to-accent-end text-white px-4 py-2 rounded-lg hover:opacity-95 transition shadow-md"
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
        <footer className="mt-8 bg-gradient-to-tr from-violet-700 via-blue-600 to-cyan-500 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-xl font-bold">Smart City Portal</h4>
              <p className="muted text-sm">
                Building connected, resilient cities — discover services, report issues, and give feedback.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a href="#" aria-label="twitter" className="text-white/90 hover:text-white">Twitter</a>
                <a href="#" aria-label="github" className="text-white/90 hover:text-white">GitHub</a>
                <a href="#" aria-label="linkedin" className="text-white/90 hover:text-white">LinkedIn</a>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2 text-sm muted">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/cities" className="hover:text-white">Cities</a></li>
                <li><a href="/admin/login" className="hover:text-white">Admin Login</a></li>
                <li><a href="/admin/register" className="hover:text-white">Admin Register</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Contact</h5>
              <p className="text-sm muted">support@smartcity.example</p>
              <p className="text-sm muted">+1 (555) 123-4567</p>
              <p className="text-sm muted mt-2">123 City Ave, Metropolis</p>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Newsletter</h5>
              <p className="text-sm muted mb-3">Get monthly updates about new cities and features.</p>
              <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks — subscribed!');}} className="flex gap-2">
                <input aria-label="email" type="email" placeholder="you@domain.com" required className="w-full px-3 py-2 rounded-lg text-gray-900" />
                <button className="bg-gradient-to-r from-vibrant-yellow to-vibrant-red text-white px-4 py-2 rounded-lg text-sm">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm muted">
              <div>© {new Date().getFullYear()} Smart City Portal. All rights reserved.</div>
              <div className="mt-3 md:mt-0">Made with ❤️ · <a href="#" className="hover:text-white">Privacy</a> · <a href="#" className="ml-3 hover:text-white">Terms</a></div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
