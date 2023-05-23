/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 *
 * @swagger
 * /user/follow/{userIdToFollow}:
 *   post:
 *     summary: Follow a user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
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
 *
 * @swagger
 * /user/followers:
 *   get:
 *     summary: Get the list of followers for the currently authenticated user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
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
 */

const express = require('express');
const router = express.Router();
const {getFollowers,followUser} = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware');
// Route pour suivre un utilisateur
router.post('/follow/:userIdToFollow', authMiddleware, followUser);

// Route pour récupérer les followers de l'utilisateur actuellement authentifié
router.get('/followers', authMiddleware, getFollowers);

module.exports = router;