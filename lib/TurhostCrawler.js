const ICrawler = require("./ICrawler");

class TurhostCrawler extends ICrawler {
    constructor({ options } = {}) {
        super({ options });
    }

    async fetchData() {
        return getData();

        function getData(results = []) {
            let rows = document.querySelectorAll("#domainprices table.domain-table tbody tr");

            results = Array.from(rows).map(row => {

                let domainColumn = row.querySelector("th")
                let columns = row.querySelectorAll("td")
                return {
                    domain: domainColumn?.innerText?.trim(),
                    type: "",
                    new_registration_fee: columns[0].querySelector("span.price-usd-span")?.innerText?.trim()?.replace("$", ""),
                    renewal_fee: columns[1].querySelector("span.price-usd-span")?.innerText?.trim()?.replace("$", ""),
                    transfer_fee: columns[2].querySelector("span.price-usd-span")?.innerText?.trim()?.replace("$", "")
                }
            });


            return results;
        }
    }

}

module.exports = TurhostCrawler;