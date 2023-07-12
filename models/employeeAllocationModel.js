const { Schema, model } = require("mongoose");

const employeeAllocationSchema = new Schema(
    {
        emp_name: { type: String, required: true },
        cm_group: { type: String, required: true },
        other_cm_group: { type: String, default: "N/A" },
        comment: { type: String, default: "N/A" },
        week_no: { type: Number, required: true },
        week_start_date: { type: Date },
        allocation_details: [
            { type: Schema.Types.ObjectId, ref: "Allocation" },
        ],
        leave: { type: Number, default: 0 },
        public_holiday: { type: Number, default: 0 },
        vacation: { type: Number, default: 0 },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

employeeAllocationSchema.virtual("sum").get(function () {
    const allocationDetails = this.allocation_details || [];
    const sumAllocation = allocationDetails.reduce(
        (acc, detail) => acc + detail.allocation,
        0
    );

    return sumAllocation + this.leave + this.public_holiday + this.vacation;
});

employeeAllocationSchema.virtual("available").get(function () {
    return 100 - this.sum;
});

const EmployeeAllocation = model(
    "EmployeeAllocation",
    employeeAllocationSchema
);
module.exports = EmployeeAllocation;
