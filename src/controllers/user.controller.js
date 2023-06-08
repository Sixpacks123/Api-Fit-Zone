const db = require('../models');
const User = db.user;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where uploaded files will be stored
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// Create the multer upload instance
const upload = multer({ storage: storage });
exports.followUser = async (req, res) => {
    try {
        const { userIdToFollow } = req.params;
        const userId = req.user._id;

        // Vérifie si l'utilisateur à suivre existe
        const userToFollow = await User.findById(userIdToFollow);
        if (!userToFollow) {
            return res.status(404).json({ message: 'L\'utilisateur à suivre n\'existe pas' });
        }

        // Vérifie si l'utilisateur a déjà suivi l'utilisateur en question
        const isAlreadyFollowing = userToFollow.followers.includes(userId);
        if (isAlreadyFollowing) {
            return res.status(400).json({ message: 'Vous suivez déjà cet utilisateur' });
        }

        // Ajoute l'utilisateur à la liste des followers de l'utilisateur à suivre
        userToFollow.followers.push(userId);
        await userToFollow.save();

        res.status(200).json({ message: 'Vous suivez maintenant cet utilisateur' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors du suivi de l\'utilisateur' });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const userId = req.user._id;

        // Récupère les informations de l'utilisateur en question, avec sa liste de followers
        const user = await User.findById(userId).populate('followers');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user.followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des followers' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;

        // Supprime l'utilisateur de la base de données
        await User.findByIdAndRemove(userId);

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du compte utilisateur' });
    }
};
exports.updateUser = async (req, res) => {
    try {

        // Vérifie si l'utilisateur existe
        console.log(req.user.id)
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user information with the data provided in the request body
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.gender = req.body.gender;
        user.age = req.body.age;
        user.height = req.body.height;
        user.weight = req.body.weight;
        user.fitnessLevel = req.body.fitnessLevel;

        // Check if a file was uploaded
        if (req.file) {
            // Update the user's profile image path
            user.profileImage = req.file.path;
        }

        // Save the user changes to the database
        await user.save();

        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating user information' });
    }
};
