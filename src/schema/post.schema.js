const Joi = require('joi');

// Schéma de validation pour la création d'un post
const postCreateSchema = Joi.object({
    title: Joi.string().required(),     // Titre du post (requis)
    content: Joi.string().required()    // Contenu du post (requis)
});

// Schéma de validation pour la mise à jour d'un post
const postUpdateSchema = Joi.object({
    title: Joi.string(),    // Titre du post
    content: Joi.string()   // Contenu du post
});

// Schéma de validation pour la création d'un commentaire
const commentCreateSchema = Joi.object({
    content: Joi.string().required()    // Contenu du commentaire (requis)
});

// Schéma de validation pour la mise à jour d'un commentaire
const commentUpdateSchema = Joi.object({
    content: Joi.string().required()     // Contenu du commentaire (requis)
});

// Schéma de validation pour la requête d'ajout de like à un post
const likeAddSchema = Joi.object({
    postId: Joi.string().required()      // ID du post (requis)
});

// Schéma de validation pour la requête de suppression d'un like d'un post
const likeRemoveSchema = Joi.object({
    postId: Joi.string().required()      // ID du post (requis)
});

const postDeleteSchema = Joi.object({
    postId: Joi.string().required()     // ID du post à supprimer (requis)
});
const commentDeleteSchema = Joi.object({
    commentId: Joi.string().required()     // ID du commentaire à supprimer (requis)
});
const postGetByIdSchema = Joi.object({
    postId: Joi.string().required()     // ID du post à récupérer (requis)
});
module.exports = {
    postCreateSchema,
    postUpdateSchema,
    commentCreateSchema,
    commentUpdateSchema,
    likeAddSchema,
    likeRemoveSchema,
    postDeleteSchema,
    commentDeleteSchema,
    postGetByIdSchema
};