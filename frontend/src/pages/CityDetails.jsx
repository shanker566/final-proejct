import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCityById, sendFeedback } from '../api/api';

export default function CityDetails(){
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setLoading(true);
    setError(null);
    console.log('CityDetails: fetching id=', id);
    getCityById(id)
      .then((res)=>{
        console.log('CityDetails: response', res);
        const data = res.data?.city || res.data || null;
        if (!data) throw new Error('No city data');
        setCity(data);
      })
      .catch((err)=>{
        console.error('CityDetails fetch error', err);
        setError(err?.response?.data?.message || err.message || 'Failed to load city');
      })
      .finally(()=> setLoading(false));
  },[id]);

  if (loading) return <div>Loading city...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

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
                  <div className="flex flex-col items-end gap-2">
                    {s.contact && <div className="text-sm text-blue-600">{s.contact}</div>}
                    <button
                      onClick={async () => {
                        const message = window.prompt(`Describe the issue with ${s.name}`);
                        if (!message) return;
                        try {
                          await sendFeedback({
                            name: 'Anonymous',
                            email: '',
                            issueType: 'service',
                            message,
                            service: s.name,
                            city: city.name,
                          });
                          alert('Thanks — your report has been sent.');
                        } catch (err) {
                          console.error('Report failed', err);
                          alert('Failed to send report. Please try again later.');
                        }
                      }}
                      className="text-sm px-3 py-1 rounded bg-gradient-to-r from-vibrant-blue to-vibrant-green text-white hover:opacity-95"
                    >
                      Report Service
                    </button>
                  </div>
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
