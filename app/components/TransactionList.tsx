import { useEffect, useState } from 'react';

const TransactionList = ({ refresh, onUpdate }: { refresh: boolean; onUpdate: () => void }) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Failed to delete transaction');

      // Trigger the update in the parent to refresh the transaction list
      onUpdate();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction: any) => (
        <div key={transaction._id} className="p-4 border border-gray-300 rounded-md">
          <p>
            <strong>{transaction.description}</strong>
          </p>
          <p>Amount: ${transaction.amount}</p>
          <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
          <p>Category: {transaction.category}</p>
          <button
            onClick={() => handleDelete(transaction._id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
