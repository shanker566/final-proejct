import React from "react";

export default function LoginCard() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">Login</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <p className="text-xs text-red-500 mt-1">Username cannot be blank.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>

          <div className="flex justify-center my-2">
            <img
              src="https://dummyimage.com/120x40/eee/000&text=gaioocv"
              alt="captcha"
              className="rounded-md shadow-sm"
            />
          </div>

          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <div className="text-center text-sm text-red-500 space-x-2">
            <a href="#" className="hover:underline">Forgot Password?</a> |
            <a href="#" className="hover:underline"> Parent Registration?</a>
            <div>
              <a href="#" className="hover:underline">MFA Registration?</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
