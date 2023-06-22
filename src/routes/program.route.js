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
 * @swagger
 * /program/{programId}/like:
 *   post:
 *     summary: Like a program
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the program to like
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Program not found
 *       500:
 *         description: Internal server error
 * @swagger
 * /program/{programId}/unlike:
 *   delete:
 *     summary: Retire un like d'un programme spécifique
 *     description: Retire un like d'un programme spécifique pour l'utilisateur connecté.
 *     tags:
 *       - Program
 *     parameters:
 *       - in: path
 *         name: programId
 *         description: L'ID du programme à unliker.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Le like a été retiré avec succès.
 *       400:
 *         description: L'utilisateur n'a pas encore liké le programme.
 *       401:
 *         description: L'utilisateur doit être connecté pour retirer un like.
 *       404:
 *         description: Le programme spécifié n'a pas été trouvé.
 *       500:
 *         description: Une erreur est survenue du côté serveur.
 * @swagger
 * /program/{programId}/comments:
 *   post:
 *     summary: Commenter un programme
 *     tags:
 *       - Program
 *     description: Permet de commenter un programme existant
 *     parameters:
 *       - in: path
 *         name: programId
 *         description: ID du programme à commenter
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Contenu du commentaire
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenu du commentaire
 *                 example: "Super programme, je vais l'essayer !"
 *     responses:
 *       201:
 *         description: Commentaire ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   description: Informations sur le commentaire ajouté
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID du commentaire
 *                     content:
 *                       type: string
 *                       description: Contenu du commentaire
 *                     createdBy:
 *                       type: object
 *                       description: Utilisateur ayant créé le commentaire
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID de l'utilisateur
 *                         username:
 *                           type: string
 *                           description: Nom d'utilisateur de l'utilisateur
 *       400:
 *         description: Requête invalide (paramètres manquants, etc.)
 *       401:
 *         description: Non autorisé (utilisateur non authentifié)
 *       404:
 *         description: Programme non trouvé
 *       500:
 *         description: Erreur serveur
 * @swagger
 * /user/programs/{userId}:
 *   get:
 *     summary: Get programs created by a specific user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of programs created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */





const express = require('express');

const router = express.Router();

const Program = require("../controllers/program.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const validatorMiddleware = require('../middlewares/validator.middleware');

const {programSchema,
    updateProgramSchema,
    getProgramByIdSchema,
    deleteProgramByIdSchema,
    likeProgramSchema,
    unlikeProgramSchema,
    commentProgramSchema} = require('../schema/post.schema');

// Créer un nouveau programme de musculation
router.post('/',authMiddleware,validatorMiddleware(programSchema), Program.createProgram);

// Récupérer tous les programmes de musculation
router.get('/', authMiddleware,Program.getAllPrograms);

// Récupérer un programme de musculation spécifique en fonction de son ID
router.get('/:programId',authMiddleware, validatorMiddleware(getProgramByIdSchema), Program.getProgramById);

// Mettre à jour un programme de musculation spécifique en fonction de son ID
router.put('/:programId',authMiddleware,validatorMiddleware(updateProgramSchema), Program.updateProgramById);

// Supprimer un programme de musculation spécifique en fonction de son ID
router.delete('/:programId',authMiddleware, validatorMiddleware(deleteProgramByIdSchema),Program.deleteProgramById);
// Like a program
router.post('/:programId/like', authMiddleware, validatorMiddleware(likeProgramSchema), Program.likeProgram);

// Dislike a program
router.post('/:programId/dislike', authMiddleware, validatorMiddleware(unlikeProgramSchema), Program.unlikeProgramById);

// Add a comment to a program
router.post('/:programId/comments', authMiddleware, validatorMiddleware(commentProgramSchema), Program.commentProgram);

router.get('/programs/:userId', Program.getProgramsByUser);

module.exports = router;
