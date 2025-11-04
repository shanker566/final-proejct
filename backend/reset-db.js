const mongoose = require('mongoose');
const City = require('./src/models/city.model');
const Service = require('./src/models/service.model');
require('dotenv').config();

const sample = [
  {
    city: { 
      name: 'Hyderabad', 
      population: 10000000, 
      area: '650 km2', 
      description: 'Known for tech industry, biryani, and historical monuments'
    },
    services: [
      { 
        name: 'KIMS Hospital', 
        type: 'Health', 
        location: 'Secunderabad', 
        contact: '040-23456789', 
        details: '24/7 Multi-specialty hospital' 
      },
      { 
        name: 'Hyderabad Metro', 
        type: 'Transport', 
        location: 'City-wide', 
        contact: '040-87654321', 
        details: 'Rapid transit system covering major areas' 
      }
    ]
  },
  {
    city: { 
      name: 'Bengaluru', 
      population: 12000000, 
      area: '709 km2', 
      description: 'Silicon Valley of India, known for IT industry and pleasant weather'
    },
    services: [
      { 
        name: 'Namma Metro', 
        type: 'Transport', 
        location: 'City-wide', 
        contact: '080-12345678', 
        details: 'Metro rail network connecting major tech parks' 
      },
      { 
        name: 'Victoria Hospital', 
        type: 'Health', 
        location: 'City Market', 
        contact: '080-87654321', 
        details: 'Government multi-specialty hospital' 
      }
    ]
  },
  {
    city: { 
      name: 'Mumbai', 
      population: 20400000, 
      area: '603 km2', 
      description: 'Financial capital of India, home to Bollywood'
    },
    services: [
      { 
        name: 'Western Railway', 
        type: 'Transport', 
        location: 'Mumbai Suburban', 
        contact: '022-12345678', 
        details: 'Suburban rail network' 
      },
      { 
        name: 'BMC Disaster Management', 
        type: 'Emergency', 
        location: 'City-wide', 
        contact: '022-87654321', 
        details: '24/7 emergency response' 
      }
    ]
  },
  {
    city: { 
      name: 'Delhi', 
      population: 16800000, 
      area: '1,484 km2', 
      description: 'Capital city, blend of history and modernity'
    },
    services: [
      { 
        name: 'Delhi Metro', 
        type: 'Transport', 
        location: 'NCR Region', 
        contact: '011-12345678', 
        details: 'Modern metro system' 
      },
      { 
        name: 'AIIMS Delhi', 
        type: 'Health', 
        location: 'AIIMS Campus', 
        contact: '011-87654321', 
        details: 'Premier medical institute and hospital' 
      }
    ]
  },
  {
    city: { 
      name: 'Chennai', 
      population: 7100000, 
      area: '426 km2', 
      description: 'Cultural capital of South India, automotive hub'
    },
    services: [
      { 
        name: 'Chennai Metro Rail', 
        type: 'Transport', 
        location: 'City-wide', 
        contact: '044-12345678', 
        details: 'Air-conditioned metro service' 
      },
      { 
        name: 'Chennai Corporation Parks', 
        type: 'Recreation', 
        location: 'Multiple locations', 
        contact: '044-87654321', 
        details: 'Public parks and recreation centers' 
      }
    ]
  },
  {
    city: { 
      name: 'Kolkata', 
      population: 4500000, 
      area: '206 km2', 
      description: 'City of Joy, cultural and intellectual capital'
    },
    services: [
      { 
        name: 'Kolkata Metro', 
        type: 'Transport', 
        location: 'City-wide', 
        contact: '033-12345678', 
        details: 'First metro rail in India' 
      },
      { 
        name: 'Howrah Public Library', 
        type: 'Education', 
        location: 'Howrah', 
        contact: '033-87654321', 
        details: 'Historic public library' 
      }
    ]
  }
];

async function resetDatabase() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected! Clearing existing data...');
  
  await Service.deleteMany({});
  await City.deleteMany({});
  console.log('Existing data cleared. Creating new cities and services...');

  for (const entry of sample) {
    const city = await City.create(entry.city);
    console.log(`Created city: ${city.name}`);
    
    const serviceIds = [];
    for (const serviceData of entry.services) {
      const service = await Service.create({
        ...serviceData,
        city: city._id
      });
      serviceIds.push(service._id);
      console.log(`  - Added service: ${service.name}`);
    }
    
    await City.findByIdAndUpdate(city._id, {
      $set: { publicServices: serviceIds }
    });
    console.log(`  - Linked ${serviceIds.length} services to ${city.name}`);
  }

  const cities = await City.find().populate('publicServices');
  console.log('\nDatabase reset complete!');
  console.log(`Created ${cities.length} cities with ${cities.reduce((sum, c) => sum + c.publicServices.length, 0)} total services.`);
  
  await mongoose.connection.close();
  console.log('Database connection closed.');
}

resetDatabase().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});