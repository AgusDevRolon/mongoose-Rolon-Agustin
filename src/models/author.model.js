import {model, Schema} from "mongoose";

const AuthorSchema = new Schema({
    name: {type: String, required: true},
    bio: {type: String, required: true},
    birthdate: {type: Date},
}, {timestamps: true});

export default model("Author", AuthorSchema);