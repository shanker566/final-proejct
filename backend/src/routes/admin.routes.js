const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.model');

const City = require('../models/city.model');
const Service = require('../models/service.model');

// Register admin
router.post('/register', async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err.message });
  }
});

module.exports = router;

// Admin utilities: list duplicate city names and optionally cleanup
router.get('/duplicates', async (req, res) => {
  try {
    const groups = await City.aggregate([
      { $group: { _id: '$name', ids: { $push: '$_id' }, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } }
    ]);
    const results = groups.map(g => ({ name: g._id, ids: g.ids.map(String), count: g.count }));
    res.json({ duplicates: results });
  } catch (err) {
    res.status(500).json({ message: 'Error finding duplicates', error: err.message });
  }
});

// Cleanup duplicates for a given city name. Body: { name: string, keepId?: string }
router.post('/duplicates/cleanup', async (req, res) => {
  const { name, keepId } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });
  try {
    const groups = await City.find({ name }).select('_id').lean();
    if (!groups || groups.length < 2) return res.status(400).json({ message: 'No duplicates found for that name' });
    const ids = groups.map(g => String(g._id));
    const keep = keepId ? String(keepId) : ids[0];
    if (!ids.includes(keep)) return res.status(400).json({ message: 'keepId must be one of the duplicate ids' });

    const toDelete = ids.filter(id => id !== keep);

    // Reassign services referencing deleted city ids to the keep city
    const updatedServices = [];
    for (const delId of toDelete) {
      const services = await Service.find({ city: delId });
      for (const svc of services) {
        svc.city = keep;
        await svc.save();
        updatedServices.push(String(svc._id));
      }
    }

    // Ensure the keep city has the services in its publicServices array
    if (updatedServices.length > 0) {
      await City.findByIdAndUpdate(keep, { $addToSet: { publicServices: { $each: updatedServices } } });
    }

    // Delete the duplicate city documents
    await City.deleteMany({ _id: { $in: toDelete } });

    res.json({ message: 'Cleanup completed', kept: keep, deleted: toDelete, reassignedServices: updatedServices });
  } catch (err) {
    res.status(500).json({ message: 'Cleanup failed', error: err.message });
  }
});
