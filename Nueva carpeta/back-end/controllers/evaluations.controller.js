const express = require('express');
const router = express.Router();
const evaluationService = require('../services/evaluations.service');
const { validateEvaluation } = require('../middlewares/validateRequest');
const asyncHandler = require('../middlewares/asyncHandler')

router.post('/', validateEvaluation, asyncHandler(async (req, res) => {
    try {
        const result = await evaluationService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}));

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const evaluations = await evaluationService.getAll();
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener evaluaciones", error: error.message });
    }
  })
);


router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      try {
        const evaluation = await evaluationService.getById(req.params.id);
        if (!evaluation) {
          return res.status(404).json({ message: "Evaluación no encontrada" });
        }
        res.json(evaluation);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener evaluación", error: error.message });
      }
    })
);

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
      try {
        const updatedEvaluation = await evaluationService.update(req.params.id, req.body);
        if (!updatedEvaluation) {
          return res.status(404).json({ message: "Evaluación no encontrada" });
        }
        res.json(updatedEvaluation);
      } catch (error) {
        res.status(500).json({ message: "Error al actualizar evaluación", error: error.message });
      }
    })
);

router.get(
    "/employee/:id",
    asyncHandler(async (req, res) => {
      try {
        const evaluations = await evaluationService.getByEmployeeId(req.params.id);
        if (!evaluations.length) {
          return res.status(404).json({ message: "No hay evaluaciones para este empleado" });
        }
        res.json(evaluations);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener evaluaciones", error: error.message });
      }
    })
);

// Enviar feedback para una evaluación
router.post(
    "/feedback",
    asyncHandler(async (req, res) => {
      try {
        const { evaluationId, feedbackProvider, comments } = req.body;
        const response = await evaluationService.addFeedback(evaluationId, { feedbackProvider, comments });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "❌ Error al enviar feedback", error: error.message });
    }
    })
  );
  
  // Generar reporte de evaluación para un empleado
router.get(
    "/reports/employee/:id",
    asyncHandler(async (req, res) => {
      try {
        const { id } = req.params;
        const report = await evaluationService.generateEmployeeReport(id);
  
        if (!report) {
          return res.status(404).json({ message: "No se encontraron evaluaciones para este empleado" });
        }
  
        res.status(200).json(report);
      } catch (error) {
        res.status(500).json({ message: "Error al generar el reporte", error: error.message });
      }
    })
  );
  
module.exports = router;
