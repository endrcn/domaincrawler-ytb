require("dotenv").config({
    path: __dirname + "/../.env"
})


const { CONNECTION_STRING } = require("../config");
const Enum = require("../config/Enum");
const CrawlerFactory = require("../lib/CrawlerFactory");
const crawlerFactory = new CrawlerFactory();
const Companies = require("../db/models/Companies");
const Domains = require("../db/models/Domains");
const Prices = require("../db/models/Prices");
const Database = require("../db/Database");
const moment = require("moment");


run();

async function run() {

    await new Database().connect({ CONNECTION_STRING });

    let crawlerTypes = Object.keys(Enum.CRAWLER_TYPES);
    registerCrawlers(crawlerTypes);
    await crawl(crawlerTypes);

    process.exit(0);

}

function registerCrawlers(crawlerTypes) {

    for (const crawlerType of crawlerTypes) {
        const crawlerTypeValue = Enum.CRAWLER_TYPES[crawlerType];
        crawlerFactory.registerCrawler(crawlerTypeValue, new (require("../lib/" + crawlerTypeValue + "Crawler"))());
    }

}

async function crawl(crawlerTypes) {

    for (const crawlerType of crawlerTypes) {
        const crawlerTypeValue = Enum.CRAWLER_TYPES[crawlerType];
        const crawlerInstance = crawlerFactory.getCrawler(crawlerTypeValue, {});
        console.log(crawlerTypeValue, "crawling...");
        let results = await crawlerInstance.crawl(Enum.CRAWLER_URLS[crawlerType])

        await processResults(crawlerTypeValue, results);

    }
}

async function processResults(crawlerType, results) {
    let company = await createCompany(crawlerType);
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let domain = await createDomain(result);
        await addPrices(result, domain, company);
    }
}

async function createCompany(companyName) {
    let company = await Companies.findOne({ name: companyName });
    if (!company) {
        company = await Companies.create({
            name: companyName,
            is_active: true
        })
    }

    return company;
}

async function createDomain(data) {
    let domain = await Domains.findOne({ domain: data.domain });
    if (!domain) {
        domain = await Domains.create({
            domain: data.domain,
            domain_type: data.type,
            is_active: true
        });
    }

    return domain;
}

async function addPrices(data, domain, company) {
    try {
        let { domain: domainExt, type, ...price } = data;

        price = preparePrice(price);

        await Prices.create({
            domain: domain._id,
            company: company._id,
            ...price,
            // 2024-12-18T23:30:30.000Z
            // ['2024-12-18', '23:30:30.000Z']
            date: moment().format(Enum.DATE_FORMAT)
        })
    } catch (err) {
        console.error(err.message);
    }

}

function preparePrice(price) {
    if (price.transfer_fee == '') delete price.transfer_fee;
    if (price.renewal_fee == '') delete price.renewal_fee;
    if (price.new_registration_fee == '') delete price.new_registration_fee;

    price.transfer_fee = convertToDecimal(price.transfer_fee);
    price.renewal_fee = convertToDecimal(price.renewal_fee);
    price.new_registration_fee = convertToDecimal(price.new_registration_fee);

    return price;
}

function convertToDecimal(price) {
    if (price)
        price = price.replace(",", ".");

    return price;
}