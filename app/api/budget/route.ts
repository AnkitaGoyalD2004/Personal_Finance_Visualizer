import connectToDatabase from "@/lib/mongoose";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const budgets = await Budget.find({});
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Error fetching budgets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { category, amount } = await req.json();

    if (!category || !amount) {
      return NextResponse.json({ error: "Category and amount are required" }, { status: 400 });
    }

    let existingBudget = await Budget.findOne({ category });

    if (existingBudget) {
      existingBudget.amount = amount;
      await existingBudget.save();
    } else {
      const newBudget = new Budget({ category, amount });
      await newBudget.save();
    }

    return NextResponse.json({ message: "Budget saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving budget:", error);
    return NextResponse.json({ error: "Error saving budget" }, { status: 500 });
  }
}
