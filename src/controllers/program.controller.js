const db = require('../models');
const Program = db.program;
const Exercise = db.exercise;
exports.createProgram = async (req, res) => {
    try {
        const { name, description, visibility, exercisesDetails } = req.body;

        // Check if exercises exist in the database
        const exerciseIds = exercisesDetails.map(exercise => exercise.exercise);
        const existingExercises = await Exercise.find().where('_id').in(exerciseIds);
        if (existingExercises.length !== exerciseIds.length) {
            return res.status(400).json({ message: 'un exercie exsite pas'  });
        }

        const newProgram = new Program({ name, description, visibility, exercisesDetails });

        const savedProgram = await newProgram.save();

        res.status(201).json({
            message: 'Program crée avec succès',
            program: savedProgram,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all workout programs
exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().populate('exercisesDetails.exercise');

        res.status(200).json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific workout program by ID
exports.getProgramById = async (req, res) => {
    try {
        const program = await Program.findById(req.params.programId).populate('exercisesDetails.exercise');

        if (!program) {
            return res.status(404).json({ message: 'Program non trouvée' });
        }

        res.status(200).json(program);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a specific workout program by ID
exports.updateProgramById = async (req, res) => {
    try {
        const { name, description, visibility, exercisesDetails } = req.body;

        // Check if exercises exist in the database
        const exerciseIds = exercisesDetails.map(exercise => exercise.exercise);
        const existingExercises = await Exercise.find({ _id: { $in: exerciseIds } });
        if (existingExercises.length !== exerciseIds.length) {
            return res.status(400).json({ message: 'exercie existe pas'  });
        }

        const program = await Program.findById(req.params.programId);

        if (!program) {
            return res.status(404).json({ message: 'Program non trouvée' });
        }

        program.name = name;
        program.description = description;
        program.visibility = visibility;
        program.exercisesDetails = exercisesDetails;

        const updatedProgram = await program.save();

        res.status(200).json({
            message: 'Program updated successfully',
            program: updatedProgram,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a specific workout program by ID
exports.deleteProgramById = async (req, res) => {
    try {
        const program = await Program.findById(req.params.programId);

        if (!program) {
            return res.status(404).json({ message: 'Program non trouvée' });
        }

        await program.remove();

        res.status(200).json({ message: 'Program supprimé ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.likeProgram = async (req, res) => {
    try {
        const programId = req.params.id;
        const userId = req.user._id;

        // Vérifie si le programme existe
        const program = await Program.findById(programId);
        if (!program) {
            return res.status(404).json({ message: 'Programme introuvable' });
        }

        // Vérifie si l'utilisateur a déjà aimé le programme
        const isAlreadyLiked = program.likes.includes(userId);
        if (isAlreadyLiked) {
            return res.status(400).json({ message: 'Vous avez déjà aimé ce programme' });
        }

        // Ajoute l'utilisateur à la liste des likes du programme
        program.likes.push(userId);
        await program.save();

        res.status(200).json({ message: 'Programme aimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de like' });
    }
};

exports.commentProgram = async (req, res) => {
    try {
        const programId = req.params.id;
        const userId = req.user._id;
        const { content } = req.body;

        // Vérifie si le programme existe
        const program = await Program.findById(programId);
        if (!program) {
            return res.status(404).json({ message: 'Programme introuvable' });
        }

        // Ajoute le commentaire à la liste des commentaires du programme
        program.comments.push({ author: userId, content });
        await program.save();

        res.status(200).json({ message: 'Commentaire ajouté avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de commentaire' });
    }
};

exports.unlikeProgramById = async (req, res) => {
    try {
        const { programId } = req.params;
        const userId = req.user._id;

        // Vérifie si le programme existe
        const program = await Program.findById(programId);
        if (!program) {
            return res.status(404).json({ message: 'Le programme n\'existe pas' });
        }

        // Vérifie si l'utilisateur a déjà aimé le programme
        const isLiked = program.likes.includes(userId);
        if (!isLiked) {
            return res.status(400).json({ message: 'Vous n\'avez pas encore aimé ce programme' });
        }

        // Retire l'utilisateur de la liste des personnes ayant aimé le programme
        program.likes.pull(userId);
        await program.save();

        res.status(200).json({ message: 'Le programme a été retiré de vos favoris' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du like' });
    }
};