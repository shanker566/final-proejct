import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CityList() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cities");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
        🌆 Explore Smart Cities
      </h2>

      <p className="text-center text-gray-600 mb-6">
        Total Cities: <span className="text-blue-600 font-semibold">{cities.length}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div key={city._id} className="card bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{city.name}</h3>
            <p className="text-gray-500 mb-2">{city.description}</p>
            <p className="text-gray-600 mb-1">👥 Population: {city.population}</p>
            <p className="text-gray-600 mb-3">📍 State: {city.state || "N/A"}</p>

            {/* Services */}
            {city.publicServices && city.publicServices.length > 0 && (
              <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-1">Smart Services:</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  {city.publicServices.map((service, index) => {
                    // `service` may be a populated object (Service) or a simple string/id.
                    const label = typeof service === 'string'
                      ? service
                      : service && (service.name || JSON.stringify(service));
                    const key = (service && service._id) || index;
                    return <li key={key}>✅ {label}</li>;
                  })}
                </ul>
              </div>
            )}

            <Link
              to={`/city/${city._id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
