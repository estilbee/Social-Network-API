const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', userRoutes);


router.use((req, res) => res.send('Wrong route!'));

module.exports = router;