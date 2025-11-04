const Service = require('../models/service.model');
const City = require('../models/city.model');

exports.getAll = async (req, res) => {
  const items = await Service.find();
  res.json(items);
};

exports.create = async (req, res) => {
  const s = new Service(req.body);
  await s.save();
  // If service references a city, add it to the city's publicServices array
  if (s.city) {
    try {
      await City.findByIdAndUpdate(s.city, { $addToSet: { publicServices: s._id } });
    } catch (e) {
      // non-fatal: log and continue returning the created service
      console.error('Failed to attach service to city:', e);
    }
  }
  res.status(201).json(s);
};

exports.update = async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.delete = async (req, res) => {
  const deleted = await Service.findByIdAndDelete(req.params.id);
  if (deleted && deleted.city) {
    try {
      await City.findByIdAndUpdate(deleted.city, { $pull: { publicServices: deleted._id } });
    } catch (e) {
      console.error('Failed to detach service from city:', e);
    }
  }
  res.json({ message: 'deleted', id: req.params.id });
};
