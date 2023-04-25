const Comment = require('../models/comment.model');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
        const comment = new Comment({ content, user: req.user._id });
        await comment.save();
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all comments for a post
exports.getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId }).populate('user');
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId).populate('user');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a comment by ID
exports.updateCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        ).populate('user');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a comment by ID
exports.deleteCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await Post.findByIdAndUpdate(comment.post, {
            $pull: { comments: commentId },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
