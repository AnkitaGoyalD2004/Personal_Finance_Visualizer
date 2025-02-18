"use client"
import { useState } from 'react';
import TransactionForm from './components/TransactionForm';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const handleTransactionAdded = () => {
    setRefresh(!refresh); // Toggle refresh state to trigger re-fetch of transactions
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Personal Finance Tracker</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
    </div>
  );
}
