var express = require('express');
const Enum = require('../config/Enum');
const NatroCrawler = require('../lib/NatroCrawler');
const TurhostCrawler = require('../lib/TurhostCrawler');
var router = express.Router();
const crawlerFactory = new (require('../lib/CrawlerFactory'));
let options = {};
crawlerFactory.registerCrawler(Enum.CRAWLER_TYPES.natro, new NatroCrawler({ options }))
crawlerFactory.registerCrawler(Enum.CRAWLER_TYPES.turhost, new TurhostCrawler({ options }))

router.get('/:crawlerType', async (req, res, next) => {

    let crawlerType = req.params["crawlerType"] // req.params.crawlerType

    const crawlerInstance = crawlerFactory.getCrawler(crawlerType, {});

    let results = await crawlerInstance.crawl(Enum.CRAWLER_URLS[crawlerType]);

    res.json(results);

});

module.exports = router;
