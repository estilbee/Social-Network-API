const {Schema,model} = require('mongoose');
const Reactions = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {type: String, required: true, minlength:1, maxlength: 280}, 
    username: {type: String, required: true, trim: true}, 
    createdAt: {type: Date, default: Date.now, get: time=> new Date(time).toLocaleString()}, //part of the javaScript date constructor 
    reactions: [Reactions]//Array of nested documents created with the reactionSchema
},
{
    toJSON: {
        getters: true,
    },
        id: false,

}
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
});


const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;





 


  