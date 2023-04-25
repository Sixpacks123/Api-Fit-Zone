const Post = require('../models/post.model');

// Créer un nouveau post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id; // L'ID de l'utilisateur est extrait de l'objet `req.user` créé par middleware d'authentification
        const post = new Post({ title, content, user: userId });
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du post.' });
    }
};

// Récupérer tous les posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des posts.' });
    }
};

// Récupérer un post spécifique en fonction de son ID
exports.getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId).populate('user', 'username').populate('comments.user', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Le post demandé n\'existe pas.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du post.' });
    }
};

// Mettre à jour un post spécifique en fonction de son ID
exports.updatePostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const post = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: 'Le post demandé n\'existe pas.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du post.' });
    }
};

// Supprimer un post spécifique en fonction de son ID
exports.deletePostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: 'Le post demandé n\'existe pas.' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du post.' });
    }
};
