const db = require('../models')
const User = db.user
// Créer un nouvel utilisateur
exports.createUser = (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        fitnessLevel: req.body.fitnessLevel
    });

    newUser.save()
        .then(() => {
            res.status(201).json({
                message: 'Utilisateur créé avec succès'
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
};
