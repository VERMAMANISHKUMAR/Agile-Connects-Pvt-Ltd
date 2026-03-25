const express = require('express');
const router = express.Router();
const {
  createSiteVisit,
  getSiteVisits,
  getSiteVisitById,
  updateSiteVisit,
  deleteSiteVisit
} = require('../component/FormComponent');

router.route('/')
  .post(createSiteVisit)
  .get(getSiteVisits);

router.route('/:id')
  .get(getSiteVisitById)
  .put(updateSiteVisit)
  .delete(deleteSiteVisit);

module.exports = router;