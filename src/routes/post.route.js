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
 * /post:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with the specified title and content
 *     tags:
 *       - post
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
 * /post:
 *   get:
 *     summary: Get all post
 *     description: Get a list of all post, sorted by most recent first
 *     tags:
 *       - post
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
 * /post/{postId}:
 *   get:
 *     summary: Get a post by ID
 *     description: Get the post with the specified ID
 *     tags:
 *       - post
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
 * /post/{postId}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update the post with the specified ID
 *     tags:
 *       - post
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
 * /post/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete the post with the specified ID
 *     tags:
 *       - post
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
 * /post/{postId}/comments:
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
 * /post/{postId}/comments/{commentId}:
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
 * /post/{postId}/comments/{commentId}:
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
 * @swagger
 * /post/{postId}/likes:
 *   post:
 *     summary: Ajouter un like à un post spécifique en fonction de son ID
 *     tags: [post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du post à liker
 *     responses:
 *       200:
 *         description: Le post avec le like ajouté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized - Token is missing
 *       403:
 *         description: Forbidden - Invalid token
 *       404:
 *         description: Le post demandé n'existe pas
 *       500:
 *         description: Internal server error
 * @swagger
 * /post/{postId}/unlike:
 *   post:
 *     summary: Supprimer un like d'un post spécifique en fonction de son ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du post dont le like doit être supprimé
 *     responses:
 *       200:
 *         description: Le post avec le like supprimé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized - Token is missing
 *       403:
 *         description: Forbidden - Invalid token
 *       404:
 *         description: Le post demandé n'existe pas.
 *       500:
 *         description: Internal server error
 */
const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePostById, deletePostById } = require('../controllers/post.controller');
const { createComment, updateCommentById, deleteCommentById } = require('../controllers/comment.controller');
const { addLikeToPostById, removeLikeFromPostById } = require('../controllers/post.controller');
const validatorMiddleware = require('../middlewares/validator.middleware');
const { postCreateSchema,
    postUpdateSchema,
    commentCreateSchema,
    commentUpdateSchema,
    likeAddSchema,
    likeRemoveSchema,
    commentDeleteSchema,
    postDeleteSchema,
    postGetByIdSchema} = require('../schema/post.schema');

const authMiddleware = require('../middlewares/auth.middleware');

// Routes pour les post
router.post('/',authMiddleware,validatorMiddleware(postCreateSchema), createPost);
router.get('/', authMiddleware,getAllPosts);
router.get('/:postId',authMiddleware, getPostById);
router.put('/:postId',authMiddleware ,validatorMiddleware(postUpdateSchema),updatePostById);
router.delete('/:postId', authMiddleware,validatorMiddleware(postDeleteSchema),deletePostById);

// Routes pour les commentaires
router.post('/:postId/comments',authMiddleware,validatorMiddleware(commentCreateSchema), createComment);
router.put('/:postId/comments/:commentId',authMiddleware,validatorMiddleware(commentUpdateSchema), updateCommentById);
router.delete('/:postId/comments/:commentId',authMiddleware, validatorMiddleware(commentDeleteSchema),deleteCommentById);

// Routes pour les likes
router.post('/:postId/likes', authMiddleware,validatorMiddleware(likeAddSchema), addLikeToPostById);
router.delete('/:postId/unlike', authMiddleware,validatorMiddleware(likeRemoveSchema), removeLikeFromPostById);

module.exports = router;