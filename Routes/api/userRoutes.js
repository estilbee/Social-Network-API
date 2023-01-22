const router = require('express').Router();
const{
    getUsers,
    getSingleUser,
    createUser,
} = require('../../Controllers/userController');


router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);