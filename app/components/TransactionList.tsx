import { useEffect, useState } from 'react';

const TransactionList = ({ refresh }: { refresh: boolean }) => {
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
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
