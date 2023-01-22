const {User} = require ('../../Models/User');


module.exports = {
//this gets all of the users 
getUsers(req, res){
    User.find()
    .then(async (users) => {
        const userObj = {
            users,
            thoughts: await thoughts(),
        }
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
    .select('-__v') //what does this line do? 
    .then(async (user) => 
        !user
        ? res.status(404).json({message: 'No user with that ID'})
        : res.json({
            user,
            thoughts: await thoughts(req.params.userId),
        })
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

}