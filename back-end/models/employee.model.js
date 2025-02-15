const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
    hiredDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
