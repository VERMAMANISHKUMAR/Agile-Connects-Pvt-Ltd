const Data = require("../models/adminDashboard.model");

// ➕ Create Data
exports.createData = async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get All Data
exports.getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};