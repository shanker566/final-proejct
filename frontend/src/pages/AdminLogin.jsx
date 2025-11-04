import React from "react";

const AdminLogin = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card w-96 bg-white shadow-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Admin Login</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <a href="/admin/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
