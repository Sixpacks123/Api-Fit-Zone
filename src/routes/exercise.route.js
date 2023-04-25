const express = require('express');
const router = express.Router();
const { createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById } = require('../controllers/exercise.controller');

// Créer un nouvel exercice
router.post('/', createExercise);

// Récupérer tous les exercices
router.get('/', getAllExercises);

// Récupérer un exercice spécifique en fonction de son ID
router.get('/:exerciseId', getExerciseById);

// Mettre à jour un exercice spécifique en fonction de son ID
router.put('/:exerciseId', updateExerciseById);

// Supprimer un exercice spécifique en fonction de son ID
router.delete('/:exerciseId', deleteExerciseById);

module.exports = router;
