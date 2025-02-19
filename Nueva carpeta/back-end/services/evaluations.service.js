const Evaluation = require('../models/evaluation.model');
const Feedback = require('../models/feedback.model');

const evaluationService = {
    create: async (evaluationData) => {
        if (!evaluationData.employeeId || !evaluationData.evaluator || !evaluationData.score) {
            const error = new Error("Todos los campos son obligatorios");
            error.status = 400;
            throw error;
        }

        const newEvaluation = new Evaluation(evaluationData);
        await newEvaluation.save();
        return { message: 'Evaluación creada con éxito', evaluation: newEvaluation };
    },
    getAll: async () => {
        return await Evaluation.find().populate("employeeId");
    },
    getById : async (id) => {
        const evaluation = await Evaluation.findById(id).populate("employeeId").populate("feedbacks");
        if (!evaluation) {
            const error = new Error("Evaluación no encontrada");
            error.status = 404;
            throw error;
        }
        return evaluation;
    },
    update : async (id, evaluationData) => {
        const updatedEvaluation = await Evaluation.findByIdAndUpdate(id, evaluationData, { new: true });
        if (!updatedEvaluation) {
            const error = new Error("Evaluación no encontrada");
            error.status = 404;
            throw error;
        }
        return updatedEvaluation;
    },
    getByEmployeeId : async (employeeId) => {
        return await Evaluation.find({ employeeId });
    },
    addFeedback: async (evaluationId, feedbackData) => {
        const { feedbackProvider, comments } = feedbackData;

        if (!feedbackProvider || !comments) {
            throw new Error("Todos los campos son obligatorios");
        }

        // 1️⃣ Crear el feedback en la BD
        const newFeedback = new Feedback({
            evaluationId,
            feedbackProvider,
            comments
        });

        await newFeedback.save();

        // 2️⃣ Asociar el feedback a la evaluación
        await Evaluation.findByIdAndUpdate(
            evaluationId,
            { $push: { feedbacks: newFeedback._id } }, // Agregar el feedback al array de la evaluación
            { new: true }
        );

        return { message: "Feedback agregado con éxito", feedback: newFeedback };
    },
    generateEmployeeReport : async (employeeId) => {
        const evaluations = await Evaluation.find({ employeeId }).lean();
      
        if (!evaluations.length) return null;
      
        const totalScore = evaluations.reduce((sum, eval) => sum + eval.score, 0);
        const averageScore = (totalScore / evaluations.length).toFixed(2);
      
        return {
          employeeId,
          totalEvaluations: evaluations.length,
          averageScore,
          evaluations,
        };
      },
};

module.exports = evaluationService;
