const express = require('express');
const router = express.Router();
const auth = require('./auth.route');
const program = require('./program.route')
const exercise = require('./exercise.route');
const post = require('./post.route');
const user = require('./user.route');

router.use('/program',program)
router.use('/auth',auth)
router.use('/exercise',exercise)
router.use('/post',post)
router.use('/user',user)
router.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    res.send(JSON.stringify(healthcheck));
});

module.exports = router;
