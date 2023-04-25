const express = require('express');
const router = express.Router();
const user = require('./user.route');
const program = require('./program.route')
const exercise = require('./exercise.route');
router.use('/program',program)
router.use('/user',user)
router.use('/exercise',exercise)
router.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    res.send(JSON.stringify(healthcheck));
});

module.exports = router;
