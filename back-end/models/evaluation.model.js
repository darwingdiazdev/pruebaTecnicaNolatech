const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    evaluator: { type: String, required: true },
    score: { type: Number, required: true, min: 1, max: 10 },
    comments: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    feedbacks: [
    {
      feedbackGiver: { type: String, required: true },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
    ],
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
