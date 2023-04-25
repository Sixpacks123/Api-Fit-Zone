const express = require('express');
const router = express.Router();

const { createUser } = require("../controllers/user.controller");

// Créer un nouvel utilisateur
router.post('/', createUser);

module.exports = router;