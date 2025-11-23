const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (Render + Local)
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI environment variable!');
} else {
  console.log('Attempting to connect to MongoDB...');
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((e) => {
      console.error('❌ MongoDB connection error:', e.message);
      console.error('Details:', {
        code: e.code,
        codeName: e.codeName,
        name: e.name,
      });
    });
}

// ✅ Import Routes
const cityRoutes = require('./routes/city.routes');
const serviceRoutes = require('./routes/service.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const adminRoutes = require('./routes/admin.routes');

// ✅ Use Routes (API routes go first)
app.use('/api/cities', cityRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Seeder Route (optional)
const City = require('./models/city.model');
const Service = require('./models/service.model');

app.get('/api/seed', async (_req, res) => {
  console.log('Starting seed...');
  const sample = [
    {
      city: {
        name: 'Hyderabad',
        population: 10000000,
        area: '650 km2',
        description: 'Known for tech and biryani',
      },
      services: [
        {
          name: 'General Hospital',
          type: 'Health',
          location: 'Secunderabad',
          contact: '040-123456',
          details: '24/7 emergency',
        },
        {
          name: 'City Library',
          type: 'Education',
          location: 'Banjara Hills',
          contact: '040-987654',
          details: 'Public library with digital access',
        },
      ],
    },
    {
      city: {
        name: 'Chennai',
        population: 8000000,
        area: '426 km2',
        description: 'Capital of Tamil Nadu',
      },
      services: [
        {
          name: 'Madras General Hospital',
          type: 'Health',
          location: 'T. Nagar',
          contact: '044-111222',
          details: 'Major public hospital',
        },
        {
          name: 'Chennai Metro',
          type: 'Transport',
          location: 'Central',
          contact: '044-333444',
          details: 'Urban rail network',
        },
      ],
    },
    {
      city: {
        name: 'Pune',
        population: 6000000,
        area: '331 km2',
        description: 'IT and education hub',
      },
      services: [
        {
          name: 'Pune Bus Depot',
          type: 'Transport',
          location: 'Camp',
          contact: '020-333444',
          details: 'Public transit hub',
        },
      ],
    },
    {
      city: {
        name: 'Kochi',
        population: 700000,
        area: '94 km2',
        description: 'Port city with backwaters',
      },
      services: [
        {
          name: 'Harbor Police',
          type: 'Safety',
          location: 'Marine Drive',
          contact: '0484-555666',
          details: 'Coastal safety and patrols',
        },
      ],
    },
    {
      city: {
        name: 'Mumbai',
        population: 20000000,
        area: '603 km2',
        description: 'City of Dreams and major port',
      },
      services: [
        {
          name: 'Mumbai General Hospital',
          type: 'Health',
          location: 'Byculla',
          contact: '022-444555',
          details: 'Large public hospital',
        },
        {
          name: 'Brihanmumbai Electric Supply',
          type: 'Utilities',
          location: 'Fort',
          contact: '022-666777',
          details: 'Electricity provider',
        },
      ],
    },
    {
      city: {
        name: 'Bengaluru',
        population: 12000000,
        area: '709 km2',
        description: 'Tech capital of India',
      },
      services: [
        {
          name: 'Bangalore Metro',
          type: 'Transport',
          location: 'MG Road',
          contact: '080-888999',
          details: 'Urban metro service',
        },
      ],
    },
  ];

  try {
    console.log('Clearing existing data...');
    await Service.deleteMany({});
    await City.deleteMany({});
    console.log('Creating new cities and services...');

    const created = [];
    for (const entry of sample) {
      const c = await City.create(entry.city);
      console.log(`Created city: ${c.name}`);

      const svcDocs = [];
      for (const s of entry.services) {
        const svc = await Service.create({ ...s, city: c._id });
        svcDocs.push(svc);
        console.log(`Created service: ${svc.name} for ${c.name}`);
      }

      const serviceIds = svcDocs.map((s) => s._id);
      await City.findByIdAndUpdate(c._id, {
        $addToSet: { publicServices: { $each: serviceIds } },
      });

      const populated = await City.findById(c._id).populate('publicServices');
      created.push(populated);
    }

    res.json({
      message: '✅ Seed completed',
      count: created.length,
      cities: created,
    });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ message: '❌ Seed failed', error: err.message });
  }
});

// ----------------------------------------------------------------------
// 🚀 FRONTEND SERVE (for production on Render)
// ----------------------------------------------------------------------

// From backend/src/server.js → repoRoot/frontend/dist
const BUILD_PATH = path.join(__dirname, '..', '..', 'frontend', 'dist');

// 1. Serve static assets
app.use(express.static(BUILD_PATH));

// 2. Catch-all: send index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

// ----------------------------------------------------------------------

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Try these endpoints:
    - GET /api/cities
    - GET /api/seed
  `);
});
