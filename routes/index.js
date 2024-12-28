var express = require('express');
const Prices = require('../db/models/Prices');
const Domains = require('../db/models/Domains');
const Companies = require('../db/models/Companies');
const Enum = require('../config/Enum');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  let date = await Prices.getLastDate();
  res.render('index', { title: 'Extension List', companyCount: 0, lastUpdateDate: date.toJSON() });
});

router.get('/domain/:extension', async function (req, res, next) {
  let extension = req.params.extension;

  let domain = await Domains.findOne({ domain: extension });

  let date = await Prices.getLastDate({ domain: domain._id });

  res.render('domain', { title: "Prices for '" + extension + "' Extension", extension, companyCount: 0, lastUpdateDate: date.toJSON() });
});

router.get('/registrar/:company', async function (req, res, next) {
  let companySlug = req.params.company;

  let company = await Companies.findOne({ name: Enum.CRAWLER_TYPES[companySlug.toLowerCase()] });

  let date = await Prices.getLastDate({ company: company._id });

  res.render('company', { title: company.name + "'s Domain Extensions", company: company.name, lastUpdateDate: date.toJSON() });
});

module.exports = router;
