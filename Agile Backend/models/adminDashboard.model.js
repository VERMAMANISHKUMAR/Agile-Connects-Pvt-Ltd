const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  storeCode: String,
  address: String,
  city: String,
}, { timestamps: true });

module.exports = mongoose.model("AdminData", dataSchema);