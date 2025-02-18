import connectDB from "@/lib/mongoose";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

// Connect to MongoDB
connectDB();

// GET request: Fetch budgets
export async function GET() {
  try {
    const budgets = await Budget.findOne({}) || { categories: {} };
    return NextResponse.json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST request: Save budgets
export async function POST(req: Request) {
  try {
    const { categories } = await req.json();

    // Check if a budget record exists, update or create a new one
    let budget = await Budget.findOne({});
    if (budget) {
      budget.categories = categories;
      await budget.save();
    } else {
      budget = new Budget({ categories });
      await budget.save();
    }

    return NextResponse.json({ message: "Budgets updated successfully", budget });
  } catch (error) {
    console.error("Error saving budgets:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
