import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    number: { type: String, required: true },
    date:   { type: String, required: true },
    name:   { type: String, required: true },
    cvv:    { type: Number, required: true } ,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Card = mongoose.model('Card', CardSchema);
export default Card