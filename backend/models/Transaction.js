import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    type:        { type: String, required: true },
    description: { type: String },
    value:       { type: Number, required: true },
    date:        { type: Date,   required: true } ,
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction