import mongoose from 'mongoose';

//declaring the schema 
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

//declaring the model using the schema
var PostMessage = mongoose.model('PostMessage', postSchema);


//exporting mongoose model from this file
export default PostMessage;