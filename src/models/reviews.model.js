import { model, Schema, Types } from "mongoose";

const ReviewSchema = new Schema({
    film: {type: Types.ObjectId, ref: "Film", required: true},
    user: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
    }
}, { timestamps: true });

export default model("Review", ReviewSchema);
