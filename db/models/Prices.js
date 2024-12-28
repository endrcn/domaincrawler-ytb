const mongoose = require("mongoose");

const schema = mongoose.Schema({
    domain: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "domains" },
    company: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "companies" },
    new_registration_fee: { type: mongoose.SchemaTypes.Decimal128 },
    new_registration_badges: { type: [String] },
    renewal_fee: { type: mongoose.SchemaTypes.Decimal128 },
    renewal_badges: { type: [String] },
    transfer_fee: { type: mongoose.SchemaTypes.Decimal128 },
    transfer_badges: { type: [String] },
    is_active: { type: Boolean, default: true },
    currency: { type: String, default: "USD" },
    language: { type: String, default: "EN" },
    date: { type: Date, required: true }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

schema.index({ date: 1, company: 1, domain: 1 }, { unique: true });

class Prices extends mongoose.Model {

    static async getLastDate(query = {}) {
        let price = await super.findOne(query).sort({ date: -1 });

        return price.date;
    }

}

schema.loadClass(Prices);
module.exports = mongoose.model("prices", schema);
