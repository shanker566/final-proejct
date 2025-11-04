import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CityDetails(){
  const { id } = useParams();
  const [city, setCity] = useState(null);
  useEffect(()=>{
    // Expect backend base URL in VITE_BACKEND_URL (example: "http://localhost:5000/api")
    const base = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios.get(`${base}/cities/${id}`)
      .then(r=> setCity(r.data))
      .catch(()=> setCity(null));
  },[id]);
  if(!city) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{city.name}</h1>
      {city.description && <p className="text-gray-700">{city.description}</p>}
      {city.population && <p>Population: {city.population}</p>}

      {/* Services section (populated from backend) */}
      <div>
        <h2 className="text-xl font-semibold mt-4">Public Services</h2>
        {city.publicServices && city.publicServices.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {city.publicServices.map(s => (
              <li key={s._id} className="p-3 bg-white rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm text-gray-500">{s.type} • {s.location}</div>
                    {s.details && <div className="text-sm text-gray-600 mt-1">{s.details}</div>}
                  </div>
                  {s.contact && <div className="text-sm text-blue-600">{s.contact}</div>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No public services listed for this city.</p>
        )}
      </div>
    </div>
  )
}
