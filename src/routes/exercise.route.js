/**
 * @swagger
 * tags:
 *   name: Exercise
 *   description: Exercise management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the exercise
 *         name:
 *           type: string
 *           description: The name of the exercise
 *         description:
 *           type: string
 *           description: The description of the exercise
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the exercise
 *       example:
 *         _id: 60cb3f80e6fd402d6c51543e
 *         name: Squats
 *         description: This exercise targets the legs and glutes
 *         createdBy: 60cb3f80e6fd402d6c515440
 */

/**
 * @swagger
 * /exercise:
 *   post:
 *     summary: Create a new exercise
 *     tags: [Exercise]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the exercise
 *               description:
 *                 type: string
 *                 description: The description of the exercise
 *             example:
 *               name: Squats
 *               description: This exercise targets the legs and glutes
 *     responses:
 *       201:
 *         description: The created exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercise]
 *     responses:
 *       200:
 *         description: List of all exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */

/**
 * @swagger
 * /exercise/{exerciseId}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags: [Exercise]
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the exercise to retrieve
 *     responses:
 *       200:
 *         description: The exercise with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 /**
 * @swagger
 * /exercise/{exerciseId}:
 *   put:
 *     summary: Update an existing exercise
 *     tags: [Exercise]
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the exercise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: The updated exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       400:
 *         description: Invalid request body or exercise id
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete an existing exercise
 *     tags: [Exercise]
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the exercise to delete
 *     responses:
 *       204:
 *         description: Exercise successfully deleted
 *       400:
 *         description: Invalid exercise id
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /exercise/{exerciseId}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags: [Exercise]
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the exercise to retrieve
 *     responses:
 *       200:
 *         description: The exercise with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();
const { createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById } = require('../controllers/exercise.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Créer un nouvel exercice
router.post('/', authMiddleware,createExercise);

// Récupérer tous les exercices
router.get('/',authMiddleware, getAllExercises);

// Récupérer un exercice spécifique en fonction de son ID
router.get('/:exerciseId',authMiddleware, getExerciseById);

// Mettre à jour un exercice spécifique en fonction de son ID
router.put('/:exerciseId',authMiddleware, updateExerciseById);

// Supprimer un exercice spécifique en fonction de son ID
router.delete('/:exerciseId', deleteExerciseById);

module.exports = router;
