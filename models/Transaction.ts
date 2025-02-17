import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },  // Category for the transaction
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;
