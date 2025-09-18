import mongoose, {model, Schema} from "mongoose";

const GenreSchema = new Schema({
    name: {type: String, required: true, unique: true},
}, {timestamps: true});

export default model("Genre", GenreSchema);