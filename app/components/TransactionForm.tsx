import { useState } from 'react';

const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping']; // Predefined categories

const TransactionForm = ({ onTransactionAdded }: { onTransactionAdded: () => void }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create transaction object with the data entered by user
    const transaction = {
      amount: parseFloat(amount),
      date,
      description,
      category,
    };

    try {
      // Post the transaction data to the API
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (res.ok) {
        onTransactionAdded(); // Call the parent function to refresh the transaction list
        // Reset the form fields
        setAmount('');
        setDate('');
        setDescription('');
        setCategory('');
      } else {
        console.error('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
