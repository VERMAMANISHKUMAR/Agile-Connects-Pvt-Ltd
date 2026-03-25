const mongoose = require('mongoose');

const siteVisitSchema = new mongoose.Schema({
  sideId: { type: String, required: true },
  sideName: { type: String, required: true },
  sideAddress: { type: String, required: true },
  visitDate: { type: Date, required: true },
  visitDay: { type: String, required: true },
  visitTimeIssue: { type: String, required: true },
  issueAfterVisit: { type: String, required: true },
  asansQuantity: { type: String, required: true },
  mqqtQuantity: { type: String, required: true },
  lastVisit: { type: String},
}, { timestamps: true });

module.exports = mongoose.model('SiteVisit', siteVisitSchema);