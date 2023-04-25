/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: The user who created the post
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *           description: The comments on the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the post was created
 *
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with the specified title and content
 *     tags:
 *       - Posts
 *     requestBody:
 *       description: Post object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             example:
 *               title: My First Post
 *               content: Lorem ipsum dolor sit amet...
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Get a list of all posts, sorted by most recent first
 *     tags:
 *       - Posts
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '500':
 *         description: Internal server error
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a post by ID
 *     description: Get the post with the specified ID
 *     tags:
 *       - Posts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update the post with the specified ID
 *     tags:
 *       - Posts
 *     requestBody:
 *       description: Post object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete the post with the specified ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No content
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create a new comment on a post
 *     description: Create a new comment on the post with the specified ID
 *     tags:
 *       - Comments
 *     requestBody:
 *       description: Comment object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             example:
 *               content: This is a new comment.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to add the comment to
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Update a comment by ID
 *     description: Update the comment with the specified ID on the post with the specified ID
 *     tags:
 *       - Comments
 *     requestBody:
 *       description: Comment object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentUpdate'
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post that the comment belongs to
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         description: ID of the comment to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Post or comment not found
 *       '500':
 *         description: Internal server error
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete the comment with the specified ID on the post with the specified ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post that the comment belongs to
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         description: ID of the comment to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No content
 *       '404':
 *         description: Post or comment not found
 *       '500':
 *         description: Internal server error
 */
const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePostById, deletePostById } = require('../controllers/post.controller');
const { createComment, updateCommentById, deleteCommentById } = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Routes pour les posts
router.post('/',authMiddleware, createPost);
router.get('/', authMiddleware,getAllPosts);
router.get('/:postId',authMiddleware, getPostById);
router.put('/:postId',authMiddleware,updatePostById);
router.delete('/:postId', authMiddleware,deletePostById);

// Routes pour les commentaires
router.post('/:postId/comments',authMiddleware, createComment);
router.put('/:postId/comments/:commentId',authMiddleware, updateCommentById);
router.delete('/:postId/comments/:commentId',authMiddleware, deleteCommentById);

module.exports = router;