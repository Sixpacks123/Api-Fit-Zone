const db = require('../models');
const Exercise = db.exercise;

// Créer un nouvel exercice
exports.createExercise = (req, res) => {
    const newExercise = new Exercise({
        name: req.body.name,
        description: req.body.description,
        createdBy: req.body.createdBy
    });
    newExercise.save()
        .then(() => {
            res.status(201).json({
                message: 'Exercice créé avec succès'
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
};

// Obtenir tous les exercices
exports.getAllExercises = (req, res) => {
    Exercise.find()
        .then((exercises) => {
            res.status(200).json(exercises);
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
};

// Obtenir un exercice spécifique en fonction de son ID
exports.getExerciseById = (req, res) => {
    Exercise.findById(req.params.exerciseId)
        .then((exercise) => {
            if (!exercise) {
                return res.status(404).json({ message: 'Exercice non trouvé' });
            }
            res.status(200).json(exercise);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

// Mettre à jour un exercice spécifique en fonction de son ID
exports.updateExerciseById = (req, res) => {
    Exercise.findById(req.params.exerciseId)
        .then((exercise) => {
            if (!exercise) {
                return res.status(404).json({ message: 'Exercice non trouvé' });
            }
            exercise.name = req.body.name;
            exercise.description = req.body.description;
            exercise.createdBy = req.body.createdBy;
            exercise.save()
                .then(() => {
                    res.status(200).json({
                        message: 'Exercice mis à jour avec succès',
                        exercise: exercise
                    });
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

// Supprimer un exercice spécifique en fonction de son ID
exports.deleteExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercice non trouvé' });
        }
        await Exercise.deleteOne();
        res.status(200).json({ message: 'Exercice supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};