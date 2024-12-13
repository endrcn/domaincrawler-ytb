class CrawlerFactory {

    constructor() {
        this.crawlerMap = {};
    }

    registerCrawler(crawlerType, crawlerInstance) {
        this.crawlerMap[crawlerType] = crawlerInstance;
    }

    getCrawler(crawlerType, { options }) {
        const crawlerInstance = this.crawlerMap[crawlerType];
        if (!crawlerInstance) {
            throw new Error(`${crawlerType} tipinde bir crawler mevcut değil.`);
        }

        return crawlerInstance;
    }

}

module.exports = CrawlerFactory;