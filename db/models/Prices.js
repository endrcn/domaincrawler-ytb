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

class Prices extends mongoose.Model {

}

schema.loadClass(Prices);
module.exports = mongoose.model("prices", schema);
