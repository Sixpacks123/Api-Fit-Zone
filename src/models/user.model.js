const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    height: Number,
    weight: Number,
    fitnessLevel: String,
    profileImage: String, // Champ pour le chemin de l'image de profil
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
