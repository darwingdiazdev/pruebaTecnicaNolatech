const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  evaluator: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 10 },
  comments: { type: String },
  date: { type: Date, default: Date.now },
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }] 
}, { timestamps: true });


module.exports = mongoose.model('Evaluation', evaluationSchema);
