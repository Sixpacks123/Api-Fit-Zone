/**
 * @swagger
 * tags:
 *   name: Program
 *   description: Program management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExerciseDetails:
 *       type: object
 *       properties:
 *         exercise:
 *           type: string
 *           description: The ID of the exercise
 *         sets:
 *           type: number
 *           description: The number of sets for the exercise
 *         reps:
 *           type: number
 *           description: The number of repetitions for each set of the exercise
 *         restTime:
 *           type: number
 *           description: The rest time in seconds between sets of the exercise
 *       example:
 *         exercise: 60cb3f80e6fd402d6c51543e
 *         sets: 3
 *         reps: 10
 *         restTime: 60
 *     Program:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - visibility
 *         - exercisesDetails
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the program
 *         name:
 *           type: string
 *           description: The name of the program
 *         description:
 *           type: string
 *           description: The description of the program
 *         visibility:
 *           type: string
 *           description: The visibility of the program (public or private)
 *         exercisesDetails:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseDetails'
 *           description: The details of the exercises in the program
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the program was added
 *       example:
 *         _id: 60cb4b4b4be1c12aa4e4df4c
 *         name: Full Body Workout
 *         description: This is a workout that targets all the major muscle groups
 *         visibility: public
 *         exercisesDetails:
 *           - exercise: 60cb3f80e6fd402d6c51543e
 *             sets: 3
 *             reps: 10
 *             restTime: 60
 *           - exercise: 60cb3f80e6fd402d6c51543f
 *             sets: 3
 *             reps: 12
 *             restTime: 45
 * @swagger
 * /program:
 *   post:
 *     summary: Create a new workout program
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       201:
 *         description: The created program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized request, token is missing or invalid
 *       500:
 *         description: Internal server error
 * @swagger
 * /program:
 *   get:
 *     summary: Récupérer tous les programmes de musculation
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les programmes de musculation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 * @swagger
 * /program/{programId}:
 *   get:
 *     summary: Récupère un programme de musculation spécifique en fonction de son ID
 *     tags: [Program]
 *     parameters:
 *       - in: path
 *         name: programId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du programme de musculation à récupérer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Le programme de musculation avec l'ID spécifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: ID de programme invalide
 *       404:
 *         description: Programme non trouvé
 *       500:
 *         description: Erreur interne du serveur
 * @swagger
 * /program/{programId}:
 *   put:
 *     summary: Mettre à jour un programme de musculation spécifique en fonction de son ID
 *     tags: [Program]
 *     parameters:
 *       - in: path
 *         name: programId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du programme à mettre à jour
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       200:
 *         description: Le programme mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Corps de la requête ou ID non valide
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Programme non trouvé
 *       500:
 *         description: Erreur interne du serveur
 * @swagger
 * /program/{programId}:
 *   delete:
 *     summary: Delete a workout program by ID
 *     tags: [Program]
 *     parameters:
 *       - in: path
 *         name: programId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the program to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: The program was successfully deleted
 *       400:
 *         description: Invalid program ID
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: The program with the specified ID was not found
 *       500:
 *         description: Internal server error
 */

const express = require('express');

const router = express.Router();

const { createProgram, getAllPrograms, getProgramById, updateProgramById, deleteProgramById } = require("../controllers/program.controller");
const authMiddleware = require('../middlewares/auth.middleware');

// Créer un nouveau programme de musculation
router.post('/',authMiddleware, createProgram);

// Récupérer tous les programmes de musculation
router.get('/', authMiddleware,getAllPrograms);

// Récupérer un programme de musculation spécifique en fonction de son ID
router.get('/:programId',authMiddleware, getProgramById);

// Mettre à jour un programme de musculation spécifique en fonction de son ID
router.put('/:programId',authMiddleware, updateProgramById);

// Supprimer un programme de musculation spécifique en fonction de son ID
router.delete('/:programId',authMiddleware, deleteProgramById);

module.exports = router;
