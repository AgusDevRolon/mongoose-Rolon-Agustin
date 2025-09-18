import {model, Schema} from "mongoose";

const DirectorSchema = new Schema({
    name: {type: String, required: true},
    country: {type: String, required: true},
}, {timestamps: true});

export default model("Director", DirectorSchema);