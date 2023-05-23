const Joi = require('joi');

// Schéma de validation pour User
const userSchema = Joi.object({
    username: Joi.string().required(),              // Nom d'utilisateur (requis)
    password: Joi.string().required(),              // Mot de passe (requis)
    email: Joi.string().email().required(),         // Adresse e-mail (requis)
    firstName: Joi.string().allow(''),              // Prénom
    lastName: Joi.string().allow(''),               // Nom de famille
    gender: Joi.string().allow(''),                 // Genre
    age: Joi.number().integer().min(0).allow(null), // Âge (entier positif ou null)
    height: Joi.number().min(0).allow(null),        // Taille (nombre positif ou null)
    weight: Joi.number().min(0).allow(null),        // Poids (nombre positif ou null)
    fitnessLevel: Joi.string().allow(''),           // Niveau de condition physique
    followers: Joi.array().items(Joi.string())      // Tableau d'IDs des utilisateurs qui suivent cet utilisateur
});

module.exports = userSchema;