require("dotenv").config({
    path: __dirname + "/../.env"
})

const Database = require("../db/Database");
const Domains = require("../db/models/Domains");
const Companies = require("../db/models/Companies");

const { CONNECTION_STRING, BASE_URL } = require("../config");
const moment = require("moment");
const fs = require("fs");

run();

async function run() {
    await new Database().connect({ CONNECTION_STRING });

    let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${BASE_URL}</loc>
                <lastmod>${moment().format("YYYY-MM-DD")}</lastmod>
            </url>
            `;

    let domains = await Domains.find({});
    let companies = await Companies.find({});

    for (let i = 0; i < domains.length; i++) {
        let domain = domains[i];
        sitemapXML += generateURL("domain/"+domain.domain);
    }

    for (let i = 0; i < companies.length; i++) {
        let company = companies[i];
        sitemapXML += generateURL("registrar/"+company.name);
    }


    sitemapXML += "</urlset>";

    fs.writeFileSync(__dirname+"/../public/sitemap.xml", sitemapXML, "UTF-8");

    process.exit(0);

}

function generateURL(endpoint) {
    return `<url>
                <loc>${BASE_URL}/${endpoint}</loc>
                <lastmod>${moment().format("YYYY-MM-DD")}</lastmod>
            </url>
            `;
}


