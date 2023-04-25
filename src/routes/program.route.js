const express = require('express');
const router = express.Router();

const { createProgram, getAllPrograms, getProgramById, updateProgramById, deleteProgramById } = require("../controllers/program.controller");

// Créer un nouveau programme de musculation
router.post('/', createProgram);

// Récupérer tous les programmes de musculation
router.get('/', getAllPrograms);

// Récupérer un programme de musculation spécifique en fonction de son ID
router.get('/:programId', getProgramById);

// Mettre à jour un programme de musculation spécifique en fonction de son ID
router.put('/:programId', updateProgramById);

// Supprimer un programme de musculation spécifique en fonction de son ID
router.delete('/:programId', deleteProgramById);

module.exports = router;
