class Price {

    static sortByPrice(prices) {
        return prices.sort((a, b) => { return a.price - b.price });
    }

}

module.exports = Price;