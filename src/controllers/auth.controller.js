const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const sgMail = require('@sendgrid/mail');
// TODO : remove this to env
sgMail.setApiKey('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')

exports.register = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName, gender, age, height, weight, fitnessLevel } = req.body;

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'L\'utilisateur existe déjà' });
        }

        // Hache le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crée un nouvel utilisateur
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            firstName,
            lastName,
            gender,
            age,
            height,
            weight,
            fitnessLevel
        });

        // Crée un token JWT
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement de l\'utilisateur' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifie si l'utilisateur existe
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'L\'utilisateur n\'existe pas' });
        }

        // Vérifie si le mot de passe est correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Crée un token JWT
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la connexion' });
    }
};

exports.getUser = async (req, res) => {
    try {
        // Extract the user's email and ID from the JWT token
        const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        const userEmail = decodedToken.email;
        const userId = decodedToken.id;

        // Look up the user in the database based on the email and ID
        const user = await User.findOne({ email: userEmail, _id: userId }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the user' });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.params;

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'L\'utilisateur n\'existe pas' });
        }

        // Generate a new random password
        const newPassword = generateRandomPassword();

        // Hash the new password
        // Update the user's password in the database
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        // Send the new password via email
        const msg = {
            to: email,
            from: 'aub.heurtault@gmail.com',
            subject: 'Réinitialisation de votre mot de passe',
            html: `
        <p>Bonjour,</p>
        <p>Votre mot de passe a été réinitialisé avec succès. Voici votre nouveau mot de passe :</p>
        <h3>${newPassword}</h3>
        <p>Assurez-vous de changer votre mot de passe une fois connecté.</p>
        <p style="color:red">Si vous n'avez pas demandé la réinitialisation de votre mot de passe, veuillez contacter l'assistance.</p>
        <p>Cordialement,</p>
        <p>L'équipe de FitZone</p>
      `,
        };

        sgMail
            .send(msg)
            .then(() => {
                res.status(200).json({ message: 'Un e-mail avec un nouveau mot de passe a été envoyé à votre adresse e-mail' });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail avec le nouveau mot de passe' });
            });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la réinitialisation du mot de passe' });
    }
};

// Function to generate a random password
function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

