const {Thoughts, User} = require ('../Models'); //models/index is what its getting 


module.exports = {
//this gets all of the thoughts 
getThoughts(req, res){
    Thoughts.find()
    .then(async (thoughtsObj) => {
        // const userObj = {
        //     thoughts,
        //     reactions: await reactions(),
        // }
        return res.json(thoughtsObj);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

//finds a single thought by their ID
getSingleThought(req,res){
    Thoughts.findOne({_id: req.params.thoughtId})
    .then(async (thoughts) => 
        !thoughts
        ? res.status(404).json({message: 'No user with that ID'})
        : res.json(thoughts)
            // reactions: await reactions(req.params.thoughtId),
    )  
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

//creates a new thought 
createThoughts(req, res) {
    Thoughts.create(req.body)
    .then((thought) => {
      
    //add thought to user
     
      User.findOneAndUpdate(
          {_id: req.body.userId},
          {$addToSet:{thoughts: thought._id}},
          {new: true }
      )
      .then((user) => 
      !user
          ? res.status(404).json({message:'No thought with that ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
      
      
    })
    .catch((err) => res.status(500).json(err));

},

deleteThoughts(req, res) {
    Thoughts.findOneAndRemove({_id: req.params.thoughtId})
    .then((thoughts) => 
    !thoughts
        ? res.status(404).json({message: 'No such thought exists'})
        : res.json({message: 'Thought successfully deleted'})
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},

putThoughts(req, res) {
    Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        {new: true }
    )
    .then((thoughts) => 
    !thoughts
        ? res.status(404).json({message:'No thought with that ID'})
        : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
},

addReactions(req, res) {
    Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought has this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
 
  removeReactions(req, res) {
    Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.params.reactionId } }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought has this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


}