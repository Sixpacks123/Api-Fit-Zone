const Joi = require('joi');

// Schéma de validation pour Exercise
const exerciseSchema = Joi.object({
    name: Joi.string().required(),          // Nom de l'exercice (requis)
    description: Joi.string().allow(''),    // Description de l'exercice
    createdBy: Joi.string().required()       // ID de l'utilisateur qui a créé l'exercice (requis)
});

// Schéma de validation pour la création d'un exercice
const createExerciseSchema = Joi.object({
    name: Joi.string().required(),          // Nom de l'exercice (requis)
    description: Joi.string().allow('')     // Description de l'exercice
});

// Schéma de validation pour la mise à jour d'un exercice
const updateExerciseSchema = Joi.object({
    name: Joi.string(),                     // Nom de l'exercice
    description: Joi.string().allow('')     // Description de l'exercice
});

// Schéma de validation pour la récupération d'un exercice par son ID
const getExerciseByIdSchema = Joi.object({
    exerciseId: Joi.string().required()      // ID de l'exercice à récupérer (requis)
});

// Schéma de validation pour la suppression d'un exercice par son ID
const deleteExerciseByIdSchema = Joi.object({
    exerciseId: Joi.string().required()      // ID de l'exercice à supprimer (requis)
});

module.exports = {
    exerciseSchema,
    createExerciseSchema,
    updateExerciseSchema,
    getExerciseByIdSchema,
    deleteExerciseByIdSchema
};
