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
