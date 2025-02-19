const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    evaluationId: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluation", required: true },
    feedbackProvider: { type: String, required: true },
    comments: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
