const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    features: { type: [String], default: [] },
    is_active: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class Companies extends mongoose.Model {

}

schema.loadClass(Companies);
module.exports = mongoose.model("companies", schema);
