const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true}, 
    email: {type: String, required: true, unique: true, match: /^([A-Za-z0-9_\.-]+)@([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,6})$/ }, 
    thoughts: [],//array of _id values referencing the Thought model 
    friends: [],//array of _id values referencing the User model (self referencing)
},

{
    toJSON: {
        virtuals: true,
    },
        id: false,
},

);

userSchema.virtual("friendCount").get(function(){
    return this.friends.length
});

const User = model("User", userSchema);

module.exports = User;