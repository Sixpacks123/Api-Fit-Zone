const db = require('../models');
const User = db.user;

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