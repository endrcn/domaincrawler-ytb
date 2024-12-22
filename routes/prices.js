var express = require('express');
const moment = require('moment');
const Enum = require('../config/Enum');
var router = express.Router();
const Prices = require("../db/models/Prices");
const Domains = require("../db/models/Domains");
const Companies = require("../db/models/Companies");
const Model = require('../lib/Model');
const DateProcess = require('../lib/DateProcess');


router.post('/', async (req, res, next) => {

    let date = DateProcess.getDateQuery(req.query.date);



    let results = await Prices.find({ date }).sort({ domain: 1 }).populate("domain").populate("company");

    let domains = Model.groupByDomain(results);

    res.json(domains);

});


router.post("/domain/:extension", async (req, res, next) => {
    let extension = req.params.extension;
    let date = DateProcess.getDateQuery(req.query.date);

    let domain = await Domains.findOne({ domain: extension })

    console.log("domain", domain);

    if (domain) {

        let results = await Prices.find({ domain: domain._id, date }).populate("company");

        console.log("results", results);

        let domains = Model.groupByDomain(results, domain);

        res.json(domains);

    } else {
        res.json({});
    }
});

router.post("/registrar/:company", async (req, res, next) => {
    let companySlug = req.params.company;
    let date = DateProcess.getDateQuery(req.query.date);

    let company = await Companies.findOne({ name: Enum.CRAWLER_TYPES[companySlug] });

    if (company) {

        let results = await Prices.find({ company: company._id, date }).populate("domain");

        for (let i = 0; i < results.length; i++) {
            results[i].company = company;   
        }

        let domains = Model.groupByDomain(results);

        res.json(domains);

    } else {

    }

});

module.exports = router;