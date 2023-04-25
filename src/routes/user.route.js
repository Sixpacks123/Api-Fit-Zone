/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 *
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         age:
 *           type: number
 *           description: The age of the user
 *         height:
 *           type: number
 *           description: The height of the user in centimeters
 *         weight:
 *           type: number
 *           description: The weight of the user in kilograms
 *         fitnessLevel:
 *           type: string
 *           description: The fitness level of the user
 *       example:
 *         _id: 60cb4b4b4be1c12aa4e4df4c
 *         username: johndoe
 *         password: $2b$10$eJmOJN/21CkZYMG8S71E..1G/u33WbJnpuzjT2T/pZsU6XcUAXpJm
 *         email: johndoe@example.com
 *         firstName: John
 *         lastName: Doe
 *         gender: male
 *         age: 30
 *         height: 180
 *         weight: 75
 *         fitnessLevel: beginner
 *
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *             example:
 *               email: johndoe@example.com
 *               password: secret123
 *     responses:
 *       200:
 *         description: Authentication successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for accessing protected resources
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [User]
 *    security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The currently authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Token is missing
 *       403:
 *         description: Forbidden - Invalid token
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();
const { register, login,getUser} = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware');
// Route pour créer un nouvel utilisateur
router.post('/signup', register);

// Route pour connecter un utilisateur existant
router.post('/signin', login);

router.get('/me', authMiddleware ,getUser);

module.exports = router;