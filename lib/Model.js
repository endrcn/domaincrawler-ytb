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
                domains[domain].new_registration_fees.push({
                    company: price.company.name,
                    new_registration_fee: parseFloat(price.new_registration_fee.toString())
                })
            }

            if (price.transfer_fee) {
                domains[domain].transfer_fees.push({
                    company: price.company.name,
                    transfer_fee: parseFloat(price.new_registration_fee.toString())
                })
            }

            if (price.renewal_fee) {
                domains[domain].renewal_fees.push({
                    company: price.company.name,
                    renewal_fee: parseFloat(price.renewal_fee.toString())
                })
            }

        }

        return domains;

    }

}

module.exports = Model;