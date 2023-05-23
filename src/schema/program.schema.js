const Joi = require('joi');

// Schéma de validation pour ExerciseDetails
const exerciseDetailsSchema = Joi.object({
    exercise: Joi.string().required(),     // ID de l'exercice (requis)
    sets: Joi.number().required(),         // Nombre de sets (requis)
    reps: Joi.number().required(),         // Nombre de répétitions (requis)
    restTime: Joi.number().required()      // Temps de repos en secondes (requis)
});

// Schéma de validation pour Program
const programSchema = Joi.object({
    name: Joi.string().required(),                 // Nom du programme (requis)
    description: Joi.string(),                      // Description du programme
    visibility: Joi.string().valid('public', 'private').required(),   // Visibilité du programme (public ou privé, requis)
    exercisesDetails: Joi.array().items(exerciseDetailsSchema).required()  // Détails des exercices (requis)
});

// Schéma de validation pour la mise à jour d'un programme
const updateProgramSchema = Joi.object({
    name: Joi.string(),                 // Nom du programme
    description: Joi.string(),          // Description du programme
    visibility: Joi.string().valid('public', 'private'),  // Visibilité du programme (public ou privé)
    exercisesDetails: Joi.array().items(exerciseDetailsSchema)  // Détails des exercices
});

// Schéma de validation pour la récupération d'un programme par son ID
const getProgramByIdSchema = Joi.object({
    programId: Joi.string().required()      // ID du programme à récupérer (requis)
});

// Schéma de validation pour la suppression d'un programme par son ID
const deleteProgramByIdSchema = Joi.object({
    programId: Joi.string().required()      // ID du programme à supprimer (requis)
});

// Schéma de validation pour liker un programme
const likeProgramSchema = Joi.object({
    programId: Joi.string().required()      // ID du programme à liker (requis)
});

// Schéma de validation pour retirer le like d'un programme
const unlikeProgramSchema = Joi.object({
    programId: Joi.string().required()      // ID du programme dont le like doit être retiré (requis)
});

// Schéma de validation pour commenter un programme
const commentProgramSchema = Joi.object({
    programId: Joi.string().required(),     // ID du programme à commenter (requis)
    content: Joi.string().required()        // Contenu du commentaire (requis)
});

module.exports = {
    programSchema,
    updateProgramSchema,
    getProgramByIdSchema,
    deleteProgramByIdSchema,
    likeProgramSchema,
    unlikeProgramSchema,
    commentProgramSchema
};
