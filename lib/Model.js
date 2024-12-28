class Model {


    static groupByDomain(priceList, paramDomain = {}) {
        let domains = {};
        for (let i = 0; i < priceList.length; i++) {
            let price = priceList[i];
            let domain = price.domain.domain || paramDomain.domain;
            if (!domains[domain]) {
                domains[domain] = {
                    domain,
                    domain_type: price.domain.domain_type,
                    date: price.date,
                    currency: price.currency,
                    language: price.language,
                    new_registration_fees: [],
                    transfer_fees: [],
                    renewal_fees: []
                }
            }

            if (price.new_registration_fee) {
                domains[domain].new_registration_fees.push(Model.generatePriceModel(price, "new_registration_fee"))
            }

            if (price.transfer_fee) {
                domains[domain].transfer_fees.push(Model.generatePriceModel(price, "transfer_fee"))
            }

            if (price.renewal_fee) {
                domains[domain].renewal_fees.push(Model.generatePriceModel(price, "renewal_fee"))
            }

        }

        return domains;

    }

    static groupByCompany(priceList, paramDomain = {}) {
        let companies = {};
        for (let i = 0; i < priceList.length; i++) {
            let price = priceList[i];
            let company = price.company.name;
            if (!companies[company]) {
                companies[company] = {
                    domain: price.domain.domain || paramDomain.domain,
                    domain_type: price.domain.domain_type,
                    date: price.date,
                    currency: price.currency,
                    language: price.language,
                    new_registration_fees: [],
                    transfer_fees: [],
                    renewal_fees: []
                }
            }

            if (price.new_registration_fee) {
                companies[company].new_registration_fees.push(Model.generatePriceModel(price, "new_registration_fee", paramDomain))
            }

            if (price.transfer_fee) {
                companies[company].transfer_fees.push(Model.generatePriceModel(price, "transfer_fee", paramDomain))
            }

            if (price.renewal_fee) {
                companies[company].renewal_fees.push(Model.generatePriceModel(price, "renewal_fee", paramDomain))
            }

        }

        return companies;

    }

    static generatePriceModel(price, priceName, domain) {
        return {
            company: price.company.name,
            domain: price.domain.domain || domain.domain,
            price: parseFloat(price[priceName].toString())
        }
    }

}

module.exports = Model;