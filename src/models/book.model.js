import mongoose, {model, Schema} from "mongoose";

const ReviewSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, required: true},
}, {timestamps: true});

const BookSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    publishedDate: {type: Date},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true},
    reviews: [ReviewSchema]
}, {timestamps: true});

export default model("Book", BookSchema);