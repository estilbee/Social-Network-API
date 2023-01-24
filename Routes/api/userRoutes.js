const router = require('express').Router();
const{
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    putUser,
    addFriend,
    removeFriend,
    
} = require('../../Controllers/userController');


router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(putUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router; 