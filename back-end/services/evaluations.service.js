const Evaluation = require('../models/evaluation.model');

const evaluationService = {
    create: async (evaluationData) => {
        const { employeeId, evaluator, score, comments } = evaluationData;

        if (!employeeId || !evaluator || !score) {
            throw new Error('⚠️ Todos los campos (employeeId, evaluator, score) son obligatorios');
        }

        const newEvaluation = new Evaluation({
            employeeId,
            evaluator,
            score,
            comments: comments || '' // Comentarios opcionales
        });

        await newEvaluation.save();
        return { message: '✅ Evaluación creada con éxito', evaluation: newEvaluation };
    },
    getById : async (id) => {
        return await Evaluation.findById(id).populate("employeeId");
    },
    update : async (id, evaluationData) => {
        return await Evaluation.findByIdAndUpdate(id, evaluationData, { new: true });
    },
    getByEmployeeId : async (employeeId) => {
        return await Evaluation.find({ employeeId });
    },
    addFeedback : async (evaluationId, feedback) => {
        return await Evaluation.findByIdAndUpdate(
          evaluationId,
          { $push: { feedbacks: feedback } },
          { new: true }
        );
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
