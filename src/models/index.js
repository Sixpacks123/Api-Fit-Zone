const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.program = require("./program.model")
db.post = require("./post.model")
db.user = require("./user.model")
db.exercise = require("./exercise.model")

module.exports = db;