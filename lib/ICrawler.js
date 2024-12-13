const puppeteer = require("puppeteer");

class ICrawler {
    constructor({ options }) {
        if (new.target === ICrawler) {
            throw new Error("Bu bir soyut sınıftır. Direkt olarak bir nesne oluşturulamaz.");
        }

        this.options = options;
    }

    async #preparePuppeteer(url) {
        // Launch the browser
        const browser = await puppeteer.launch(this.options);

        // Create a page
        const page = await browser.newPage();

        // Go to your site
        await page.goto(url);

        return { page, browser };
    }

    async crawl(url) {

        let { page, browser } = await this.#preparePuppeteer(url);

        // Evaluate JavaScript
        const results = await page.evaluate(this.fetchData);

        console.log(results);
        console.log(results.length);

        // Close browser.
        await browser.close();

        return results;
    }

    async fetchData() {
        throw new Error("Bu metod alt sınıfta override edilmelidir.");
    }
}

module.exports = ICrawler;