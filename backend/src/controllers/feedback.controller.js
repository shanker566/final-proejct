const Feedback = require('../models/feedback.model');

exports.getAll = async (req, res) => {
  const items = await Feedback.find();
  res.json(items);
};

exports.create = async (req, res) => {
  const f = new Feedback(req.body);
  await f.save();
  res.status(201).json(f);
};

exports.update = async (req, res) => {
  const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
