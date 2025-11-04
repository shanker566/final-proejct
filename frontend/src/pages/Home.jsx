import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center space-y-6 p-6">
      <h1 className="text-3xl font-bold text-blue-700">
        🏙️ Smart City — Overview
      </h1>
      <p className="text-gray-600">
        Welcome to the Smart City portal. Explore various cities, report issues,
        and access smart services easily.
      </p>

      <div className="flex flex-col items-center space-y-3">
        <Link
          to="/cities"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-40 text-center"
        >
          View All Cities
        </Link>

        <Link
          to="/admin/login"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-40 text-center"
        >
          Admin Login
        </Link>

        <Link
          to="/register"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-40 text-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
