const Evaluation = require('../models/evaluation.model');
const Feedback = require('../models/feedback.model');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const evaluationService = {
    create: async (evaluationData, req) => {
        if (!evaluationData.employeeId || !evaluationData.score) {
            const error = new Error("Todos los campos son obligatorios");
            error.status = 400;
            throw error;
        }
    
        // Extraer el evaluador desde el token (req.user)
        if (!req.user || !req.user.name) {
            const error = new Error("No se encontró el evaluador en el token");
            error.status = 401;
            throw error;
        }
    
        // Agregar el evaluador automáticamente desde el token
        evaluationData.evaluator = req.user.name;
    
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

        // ⿡ Crear el feedback en la BD
        const newFeedback = new Feedback({
            evaluationId,
            feedbackProvider,
            comments
        });

        await newFeedback.save();

        // ⿢ Asociar el feedback a la evaluación
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
      generateEmployeeReportCSV : async (employeeId) => {
        const evaluations = await Evaluation.find({ employeeId }).lean();
    
        if (!evaluations.length) return null;
    
        const totalScore = evaluations.reduce((sum, eval) => sum + eval.score, 0);
        const averageScore = (totalScore / evaluations.length).toFixed(2);
    
        // Ruta del archivo CSV
        const filePath = path.join(__dirname, `employee_report_${employeeId}.csv`);
    
        // Configurar el generador de CSV con datos planos
        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                { id: "employeeId", title: "Employee ID" },
                { id: "totalEvaluations", title: "Total Evaluations" },
                { id: "averageScore", title: "Average Score" },
                { id: "evaluationId", title: "Evaluation ID" },
                { id: "evaluator", title: "Evaluator" },
                { id: "score", title: "Score" },
                { id: "comments", title: "Comments" },
                { id: "feedbacks", title: "Feedbacks" },
                { id: "date", title: "Date" },
                { id: "createdAt", title: "Created At" },
                { id: "updatedAt", title: "Updated At" },
            ],
        });
    
        // Convertir evaluaciones a formato plano para el CSV
        const records = evaluations.map(evaluation => ({
            employeeId: employeeId,
            totalEvaluations: evaluations.length,
            averageScore: averageScore,
            evaluationId: evaluation._id,
            evaluator: evaluation.evaluator || "N/A",
            score: evaluation.score,
            comments: evaluation.comments || "No comments",
            feedbacks: evaluation.feedbacks.length > 0 ? evaluation.feedbacks.join(" | ") : "No feedbacks",
            date: evaluation.date ? new Date(evaluation.date).toISOString() : "N/A",
            createdAt: new Date(evaluation.createdAt).toISOString(),
            updatedAt: new Date(evaluation.updatedAt).toISOString(),
        }));
    
        // Escribir el CSV
        await csvWriter.writeRecords(records);
    
        console.log(`Archivo CSV generado: ${filePath}`);
        return filePath;
    },
};

module.exports = evaluationService;