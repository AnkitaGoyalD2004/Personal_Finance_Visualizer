// import connectToDatabase from '../../../lib/mongoose';
// import Transaction from '../../../models/Transaction';

// export async function GET() {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Fetch all transactions from the database
//     const transactions = await Transaction.find();

//     // Send a successful response with transactions
//     return new Response(JSON.stringify(transactions), { status: 200 });
//   } catch (error) {
//     // If there's an error, return a 500 response with an error message
//     return new Response('Error fetching transactions', { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Parse the incoming JSON request body to extract data
//     const { amount, date, description, category } = await req.json();

//     // Validate required fields (amount, date, category)
//     if (!amount || !date || !category) {
//       return new Response('Amount, date, and category are required', { status: 400 });
//     }

//     // Create a new transaction document
//     const newTransaction = new Transaction({
//       amount,
//       date,
//       description,
//       category,
//     });

//     // Save the new transaction to the database
//     await newTransaction.save();

//     // Return a success response
//     return new Response('Transaction added successfully', { status: 201 });
//   } catch (error) {
//     // If there's an error, return a 500 response with an error message
//     return new Response('Error adding transaction', { status: 500 });
//   }
// }

// // DELETE transaction by ID
// export async function DELETE(req: Request) {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Extract transaction ID from the request body
//     const { id } = await req.json();

//     if (!id) {
//       return new Response('Transaction ID is required', { status: 400 });
//     }

//     // Find and delete the transaction
//     const deletedTransaction = await Transaction.findByIdAndDelete(id);

//     if (!deletedTransaction) {
//       return new Response('Transaction not found', { status: 404 });
//     }

//     return new Response('Transaction deleted successfully', { status: 200 });
//   } catch (error) {
//     return new Response('Error deleting transaction', { status: 500 });
//   }
// }

// const fetchData = async () => {
//   try {
//     const res = await fetch('/api/your-endpoint');
//     if (!res.ok) {
//       const errorText = await res.text(); // Get the response text for debugging
//       throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
//     }
//     const data = await res.json();
//     // Process data...
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };


import connectToDatabase from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find();
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Error fetching transactions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { amount, date, description, category } = await req.json();

    if (!amount || !date || !category) {
      return NextResponse.json({ error: "Amount, date, and category are required" }, { status: 400 });
    }

    const newTransaction = new Transaction({ amount, date, description, category });
    await newTransaction.save();

    return NextResponse.json({ message: "Transaction added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: "Error adding transaction" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json({ error: "Error deleting transaction" }, { status: 500 });
  }
}
