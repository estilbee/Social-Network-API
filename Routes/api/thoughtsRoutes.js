const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThoughts,
    deleteThoughts,
    putThoughts,
    addReactions,
    removeReactions,


} = require ('../../Controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThoughts).put(putThoughts);

router.route('/:thoughtId/thoughts/:reactionId').delete(removeReactions);

router.route('/:thoughtId/thoughts/').post(addReactions);

module.exports = router; 