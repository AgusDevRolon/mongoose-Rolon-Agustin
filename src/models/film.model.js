import {model, Schema, Types} from "mongoose";

const FilmsSchema = new Schema({
    title: {type: String, required: true},
    year: {type: Number, required: true},
    details: {duration: {type: Number, required: true}, rating: {type: Number, min: 0, max: 10}},
    director: {type: Types.ObjectId, ref: "Director", required: true},
    genres: [{type: Types.ObjectId, ref: "Genre"}]
}, {timestamps: true});

export default model("Film", FilmsSchema);