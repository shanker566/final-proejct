const City = require('../models/city.model');

exports.getAll = async (req, res) => {
  const items = await City.find().populate('publicServices');
  res.json(items);
};

exports.getById = async (req, res) => {
  const item = await City.findById(req.params.id).populate('publicServices');
  res.json(item);
};

exports.create = async (req, res) => {
  const newCity = new City(req.body);
  await newCity.save();
  res.status(201).json(newCity);
};

exports.update = async (req, res) => {
  const updated = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await City.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
};
