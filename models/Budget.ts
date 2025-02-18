import mongoose, { Schema, Document } from "mongoose";

export interface Budget extends Document {
  category: string;
  amount: number;
  month: string; // Format: YYYY-MM
}

const BudgetSchema = new Schema<Budget>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
});

export default mongoose.models.Budget || mongoose.model<Budget>("Budget", BudgetSchema);
