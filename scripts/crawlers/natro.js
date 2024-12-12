const puppeteer = require("puppeteer");

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch();

    // Create a page
    const page = await browser.newPage();

    // Go to your site
    await page.goto('https://www.natro.com/domain-sorgulama');

    // Evaluate JavaScript
    const results = await page.evaluate(() => {

        return getData();

        function getData(results = []) {
            let rows = document.querySelectorAll("#dataTable-Demo > tbody > tr");

            let localResults = Array.from(rows).map(row => {

                let columns = row.querySelectorAll("td")
                return {
                    domain: columns[0].querySelector("span a")?.innerText?.trim(),
                    type: columns[1].innerText.trim(),
                    new_registration_fee: columns[2].querySelector("span span.pp-price-USD")?.innerText?.trim(),
                    renewal_fee: columns[3].querySelector("span span.pp-price-USD")?.innerText?.trim(),
                    transfer_fee: columns[4].querySelector("span span.pp-price-USD")?.innerText?.trim()
                }
            });

            results = results.concat(localResults);

            let btnNextPage = document.querySelector("#dataTable-Demo_next");
            let isLastPage = btnNextPage.className?.includes("disabled");
            
            if (!isLastPage) {
                btnNextPage.click();
                return getData(results);
            }

            return results;
        }


    });

    console.log(results);
    console.log(results.length);

    // Close browser.
    await browser.close();
})();