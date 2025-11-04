/**
 * Run this file manually to insert sample data (after configuring MONGO_URI).
 * node src/sample/seed.js
 */
const mongoose = require('mongoose');
const City = require('../models/city.model');
const Service = require('../models/service.model');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async ()=> {
  console.log('connected');
  await Service.deleteMany({});
  await City.deleteMany({});

  const sample = [
    {
      city: { name: 'Hyderabad', population: 10000000, area: '650 km2', description: 'Known for tech and biryani' },
      services: [
        { name: 'General Hospital', type: 'Health', location: 'Secunderabad', contact: '040-123456', details: '24/7 emergency' },
        { name: 'City Library', type: 'Education', location: 'Banjara Hills', contact: '040-987654', details: 'Public library with digital access' }
      ]
    },
    {
      city: { name: 'Chennai', population: 8000000, area: '426 km2', description: 'Capital of Tamil Nadu' },
      services: [
        { name: 'Madras General Hospital', type: 'Health', location: 'T. Nagar', contact: '044-111222', details: 'Major public hospital' },
        { name: 'Chennai Metro', type: 'Transport', location: 'Central', contact: '044-333444', details: 'Urban rail network' }
      ]
    },
    {
      city: { name: 'Pune', population: 6000000, area: '331 km2', description: 'IT and education hub' },
      services: [
        { name: 'Pune Bus Depot', type: 'Transport', location: 'Camp', contact: '020-333444', details: 'Public transit hub' }
      ]
    },
    {
      city: { name: 'Kochi', population: 700000, area: '94 km2', description: 'Port city with backwaters' },
      services: [
        { name: 'Harbor Police', type: 'Safety', location: 'Marine Drive', contact: '0484-555666', details: 'Coastal safety and patrols' }
      ]
    },
    {
      city: { name: 'Mumbai', population: 20000000, area: '603 km2', description: 'City of Dreams and major port' },
      services: [
        { name: 'Mumbai General Hospital', type: 'Health', location: 'Byculla', contact: '022-444555', details: 'Large public hospital' },
        { name: 'Brihanmumbai Electric Supply', type: 'Utilities', location: 'Fort', contact: '022-666777', details: 'Electricity provider' }
      ]
    },
    {
      city: { name: 'Bengaluru', population: 12000000, area: '709 km2', description: 'Tech capital of India' },
      services: [
        { name: 'Bangalore Metro', type: 'Transport', location: 'MG Road', contact: '080-888999', details: 'Urban metro service' }
      ]
    }
  ];

  try {
    const created = [];
    for (const entry of sample) {
      const c = await City.create(entry.city);
      const svcDocs = [];
      for (const s of entry.services) {
        const svc = await Service.create({ ...s, city: c._id });
        svcDocs.push(svc);
      }
      await City.findByIdAndUpdate(c._id, { $addToSet: { publicServices: { $each: svcDocs.map(x=>x._id) } } });
      created.push(await City.findById(c._id).populate('publicServices'));
    }
    console.log('Seed done', created.length);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}).catch(e=> { console.error(e); process.exit(1); });
