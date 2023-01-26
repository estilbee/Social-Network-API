const {User} = require ('../Models');


module.exports = {
//this gets all of the users 
getUsers(req, res){
    User.find().populate('thoughts')
    .then(async (userObj) => {
        // const userObj = {
        //     users,
        //     thoughts: await thoughts(),
        // }
        return res.json(userObj);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

//finds a single user by their ID
getSingleUser(req,res){
    User.findOne({_id: req.params.userId})
    .then(async (user) => 
        !user
        ? res.status(404).json({message: 'No user with that ID'})
        : res.json(user)
            // thoughts: await thoughts(req.params.userId),
    )  
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

//creates a new user 
createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));

},

deleteUser(req, res) {
    User.findOneAndRemove({_id: req.params.userId})
    .then((user) => 
    !user
        ? res.status(404).json({message: 'No such user exists'})
        : res.json({message: 'User successfully deleted'})
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},
putUser(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {new: true }
    )
    .then((user) => 
    !user
        ? res.status(404).json({message:'No user with that ID'})
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user has this id' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
 
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user has this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  

}