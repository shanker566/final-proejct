import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileWarning,
  LogOut,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCities: 0,
    totalUsers: 0,
    totalReports: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(res.data);
      } catch {
        setStats({ totalCities: 3, totalUsers: 52, totalReports: 11 });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-blue-50 font-inter">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col justify-between shadow-2xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-10 tracking-wide">
            🏙️ SmartCity Admin
          </h1>
          <nav className="space-y-2">
            <NavItem icon={<LayoutDashboard size={18} />} text="Dashboard" path="/admin/dashboard" />
            <NavItem icon={<Building2 size={18} />} text="Manage Cities" path="/cities" />
            <NavItem icon={<Users size={18} />} text="Users" path="/admin/users" />
            <NavItem icon={<FileWarning size={18} />} text="Reports" path="/admin/reports" />
            <NavItem icon={<Settings size={18} />} text="Settings" path="/admin/settings" />
          </nav>
        </div>

        <div className="border-t border-blue-500 p-6">
          <button className="flex items-center gap-3 text-red-300 hover:text-red-100 transition w-full">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-4xl font-bold text-blue-800 mb-10">Dashboard Overview</h2>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <StatCard title="Total Cities" value={stats.totalCities} color="blue" emoji="🏙️" />
          <StatCard title="Total Users" value={stats.totalUsers} color="green" emoji="👥" />
          <StatCard title="Reports Filed" value={stats.totalReports} color="red" emoji="⚠️" />
        </div>

        {/* Quick Actions */}
        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <ActionCard
            title="🏗️ Manage Cities"
            description="Add, update, and manage all cities in your smart city database."
            buttonText="Go to Cities"
            link="/cities"
            color="blue"
          />
          <ActionCard
            title="📢 Review Reports"
            description="View and address user reports for faster resolution."
            buttonText="View Reports"
            color="red"
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Smart City Dashboard — Designed with 💙
        </footer>
      </main>
    </div>
  );
}

function NavItem({ icon, text, path }) {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 hover:shadow-md transition-all"
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Link>
  );
}

function StatCard({ title, value, color, emoji }) {
  const colors = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} text-white p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform`}
    >
      <h3 className="text-lg font-medium opacity-90">{emoji} {title}</h3>
      <p className="text-5xl font-bold mt-2">{value}</p>
    </div>
  );
}

function ActionCard({ title, description, buttonText, link, color }) {
  const btnColor =
    color === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-red-600 hover:bg-red-700";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {link ? (
        <Link
          to={link}
          className={`${btnColor} text-white px-5 py-2 rounded-lg font-semibold transition`}
        >
          {buttonText}
        </Link>
      ) : (
        <button className={`${btnColor} text-white px-5 py-2 rounded-lg font-semibold`}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
