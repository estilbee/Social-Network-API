const router = require('express').Router();
// const thoughtsRoutes = require('./api/thoughtsRoutes');
const apiRoutes = require('./api');

// router.use('/thoughts', thoughtsRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;