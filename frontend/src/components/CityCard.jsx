import React from "react";
import { Link } from "react-router-dom";

export default function CityCard({ city }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition-all">
      <h2 className="text-2xl font-semibold text-blue-700">{city.name}</h2>

      {city.population && (
        <p className="text-gray-600 mt-1">Population: {city.population}</p>
      )}

      {city.weather && (
        <p className="text-gray-600 mt-1">Weather: {city.weather}</p>
      )}

      {city.description && (
        <p className="text-gray-500 mt-2">{city.description}</p>
      )}

      {city.publicServices && city.publicServices.length > 0 && (
        <p className="text-sm text-gray-600 mt-2">Services: {city.publicServices.length}</p>
      )}

      <Link
        to={`/city/${city._id}`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}
