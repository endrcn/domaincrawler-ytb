const mongoose = require("mongoose");

const schema = mongoose.Schema({
    domain: { type: String, required: true, unique: true },
    domain_type: { type: String, default: "-" },
    is_active: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class Domains extends mongoose.Model {

}

schema.loadClass(Domains);
module.exports = mongoose.model("domains", schema);
