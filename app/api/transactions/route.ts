import connectToDatabase from '../../../lib/mongoose';
import Transaction from '../../../models/Transaction';

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all transactions from the database
    const transactions = await Transaction.find();

    // Send a successful response with transactions
    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    // If there's an error, return a 500 response with an error message
    return new Response('Error fetching transactions', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the incoming JSON request body to extract data
    const { amount, date, description, category } = await req.json();

    // Validate required fields (amount, date, category)
    if (!amount || !date || !category) {
      return new Response('Amount, date, and category are required', { status: 400 });
    }

    // Create a new transaction document
    const newTransaction = new Transaction({
      amount,
      date,
      description,
      category, // Store category
    });

    // Save the new transaction to the database
    await newTransaction.save();

    // Return a success response
    return new Response('Transaction added successfully', { status: 201 });
  } catch (error) {
    // If there's an error, return a 500 response with an error message
    return new Response('Error adding transaction', { status: 500 });
  }
}
