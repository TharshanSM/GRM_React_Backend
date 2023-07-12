const { Schema, model } = require("mongoose");

const allocationSchema = new Schema(
    {
        other_cm_group: { type: String, default: "N/A" },
        customer: { type: String, required: true },
        role: { type: String, required: true },
        allocation: { type: Number, required: true },
        week_no: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Allocation = model("Allocation", allocationSchema);
module.exports = Allocation;
