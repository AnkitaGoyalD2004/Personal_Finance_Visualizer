'use client';

import { useState } from 'react';
import TransactionList from '../components/TransactionList'; // Ensure the correct import path

export default function Transactions() {
  const [refresh, setRefresh] = useState(false);

  const handleTransactionAdded = () => {
    setRefresh(!refresh); // Toggle refresh state to trigger re-fetch of transactions
  };

  return (
    <div className="container mx-auto p-6">
      <TransactionList refresh={refresh} />
    </div>
  );
}
