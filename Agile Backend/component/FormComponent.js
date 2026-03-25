const SiteVisit = require('../models/SiteVisit');
const asyncHandler = require('express-async-handler');

// Create a new site visit
const createSiteVisit = asyncHandler(async (req, res) => {
  const {
    sideId,
    sideName,
    sideAddress,
    visitDate,
    visitDay,
    visitTimeIssue,
    issueAfterVisit,
    asansQuantity,
    mqqtQuantity,
    lastVisit
  } = req.body;

  const siteVisit = await SiteVisit.create({
    sideId,
    sideName,
    sideAddress,
    visitDate,
    visitDay,
    visitTimeIssue,
    issueAfterVisit,
    asansQuantity,
    mqqtQuantity,
    lastVisit
  });

  res.status(201).json(siteVisit);
});

// Get all site visits
const getSiteVisits = asyncHandler(async (req, res) => {
  const siteVisits = await SiteVisit.find();
  res.json(siteVisits);
});

// Get single site visit
const getSiteVisitById = asyncHandler(async (req, res) => {
  const siteVisit = await SiteVisit.findById(req.params.id);
  if (siteVisit) {
    res.json(siteVisit);
  } else {
    res.status(404);
    throw new Error('Site visit not found');
  }
});

// Update site visit
const updateSiteVisit = asyncHandler(async (req, res) => {
  const siteVisit = await SiteVisit.findById(req.params.id);
  if (siteVisit) {
    Object.assign(siteVisit, req.body);
    const updatedSiteVisit = await siteVisit.save();
    res.json(updatedSiteVisit);
  } else {
    res.status(404);
    throw new Error('Site visit not found');
  }
});

// Delete site visit
const deleteSiteVisit = asyncHandler(async (req, res) => {
  const siteVisit = await SiteVisit.findById(req.params.id);
  if (siteVisit) {
    await siteVisit.remove();
    res.json({ message: 'Site visit removed' });
  } else {
    res.status(404);
    throw new Error('Site visit not found');
  }
});

module.exports = {
  createSiteVisit,
  getSiteVisits,
  getSiteVisitById,
  updateSiteVisit,
  deleteSiteVisit
};