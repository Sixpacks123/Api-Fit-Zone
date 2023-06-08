/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /user/follow/{userIdToFollow}:
 *   post:
 *     summary: Follow a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userIdToFollow
 *         required: true
 *         description: The ID of the user to follow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *       400:
 *         description: User is already being followed
 *       404:
 *         description: User to follow not found
 *       500:
 *         description: Internal server error
 *     description: |
 *       **Instructions d'authentification :**
 *
 *       Pour exécuter cette requête, incluez le token d'authentification dans l'en-tête "Authorization" de la requête. Le token doit être au format "Bearer {votre_token}". Assurez-vous d'avoir préalablement obtenu un token valide en effectuant une requête d'authentification.
 *
 * /user/followers:
 *   get:
 *     summary: Get the list of followers for the currently authenticated user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of followers for the currently authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 * /user/delete:
 *   delete:
 *     summary: Delete the currently authenticated user account
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User account successfully deleted
 *       500:
 *         description: Internal server error
 *
 * /user/update:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               fitnessLevel:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized request, token is missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();
const { getFollowers, followUser, deleteUser, updateUser } = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth.middleware");

// Route pour suivre un utilisateur
router.post('/follow/:userIdToFollow', authMiddleware, followUser);

// Route pour récupérer les followers de l'utilisateur actuellement authentifié
router.get('/followers', authMiddleware, getFollowers);

// Route pour supprimer le compte utilisateur actuellement authentifié
router.delete('/delete', authMiddleware, deleteUser);

// Route pour mettre à jour les informations de l'utilisateur actuellement authentifié
router.put('/update', authMiddleware, updateUser);

module.exports = router;
